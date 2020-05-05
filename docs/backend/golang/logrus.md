---
title: logrus的使用
---

### 特性
* 六种日志级别：debug、info、warn、error、fatal和panic
* 可扩展的Hook机制：允许使用者通过hook的方式将日志分发到任意地方，如本地文件系统、标准输出、logstash、elasticsearch或者mq等，或者通过hook定义日志内容和格式等。
* 可选的日志输出格式：logrus内置了两种日志格式，JSONFormatter和TextFormatter，如果这两个格式不满足需求，可以自己动手实现接口Formatter，来定义自己的日志格式。
* Field机制：logrus鼓励通过Field机制进行精细化的、结构化的日志记录，而不是通过冗长的消息来记录日志。
* logrus是一个可插拔的、结构化的日志框架。

### 简单使用示例

```go
package main

import (
	"os"
	log "github.com/sirupsen/logrus"
)

func init() {
	// 设置日志格式为json格式
	log.SetFormatter(&log.JSONFormatter{})

	// 设置将日志输出到标准输出（默认的输出为stderr，标准错误）
	// 日志消息输出可以是任意的io.writer类型
	log.SetOutput(os.Stdout)

	// 设置日志级别为warn以上
	log.SetLevel(log.WarnLevel)
}

func main() {
	log.WithFields(log.Fields{
		"animal": "walrus",
		"size":   10,
	}).Info("A group of walrus emerges from the ocean")

	log.WithFields(log.Fields{
		"omg":    true,
		"number": 122,
	}).Warn("The group's number increased tremendously!")

	log.WithFields(log.Fields{
		"omg":    true,
		"number": 100,
	}).Fatal("The ice breaks!")
}
```

### Hook
logrus最令人心动的功能就是其可扩展的HOOK机制了，通过在初始化时为logrus添加hook，logrus可以实现各种扩展功能。

**Hook接口**
```go
// logrus在记录Levels()返回的日志级别的消息时会触发HOOK，
// 按照Fire方法定义的内容修改logrus.Entry。
type Hook interface {
	Levels() []Level
	Fire(*Entry) error
}
```

一个简单自定义hook如下，DefaultFieldHook定义会在所有级别的日志消息中加入默认字段appName="myAppName"。

```go
type DefaultFieldHook struct {
}

func (hook *DefaultFieldHook) Fire(entry *log.Entry) error {
    entry.Data["appName"] = "MyAppName"
    return nil
}

func (hook *DefaultFieldHook) Levels() []log.Level {
    return log.AllLevels
}
```

### 使用hook来生成行号文件名
logrus的一个很致命的问题就是没有提供文件名和行号。网上给出的解决方案分位两类，一就是自己实现一个hook；二就是通过装饰器包装logrus.Entry。两种方案网上都有很多代码，但是大多无法正常工作。但总体来说，解决问题的思路都是对的：通过标准库的runtime模块获取运行时信息，并从中提取文件名，行号和调用函数名。
<br/>
标准库runtime模块的Caller(skip int)函数可以返回当前goroutine调用栈中的文件名，行号，函数信息等，参数skip表示表示返回的栈帧的层次，0表示runtime.Caller的调用着。返回值包括响应栈帧层次的pc(程序计数器)，文件名和行号信息。为了提高效率，我们先通过跟踪调用栈发现，从runtime.Caller()的调用者开始，到记录日志的生成代码之间，大概有8到11层左右，所有我们在hook中循环第8到11层调用栈应该可以找到日志记录的生产代码。

此外，runtime.FuncForPC(pc uintptr) *Func可以返回指定pc的函数信息。
所有我们要实现的hook也是基于以上原理，使用runtime.Caller()依次循环调用栈的第7~11层，过滤掉sirupsen包内容，那么第一个非siupsenr包就认为是我们的生产代码了，并返回pc以便通过runtime.FuncForPC()获取函数名称。然后将文件名、行号和函数名组装为source字段塞到logrus.Entry中即可。
```go
import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"runtime"
	"strings"
)

// line number hook for log the call context,
type lineHook struct {
    Field  string
    // skip为遍历调用栈开始的索引位置
	Skip   int
	levels []log.Level
}

// Levels implement levels
func (hook lineHook) Levels() []log.Level {
	return log.AllLevels
}

// Fire implement fire
func (hook lineHook) Fire(entry *log.Entry) error {
	entry.Data[hook.Field] = findCaller(hook.Skip)
	return nil
}

func findCaller(skip int) string {
	file := ""
	line := 0
	var pc uintptr
    // 遍历调用栈的最大索引为第11层.
	for i := 0; i < 11; i++ {
        file, line, pc = getCaller(skip + i)
        // 过滤掉所有logrus包，即可得到生成代码信息
		if !strings.HasPrefix(file, "logrus") {
			break
		}
	}

	fullFnName := runtime.FuncForPC(pc)

	fnName := ""
	if fullFnName != nil {
		fnNameStr := fullFnName.Name()
        // 取得函数名
		parts := strings.Split(fnNameStr, ".")
		fnName = parts[len(parts)-1]
	}

	return fmt.Sprintf("%s:%d:%s()", file, line, fnName)
}

func getCaller(skip int) (string, int, uintptr) {
	pc, file, line, ok := runtime.Caller(skip)
	if !ok {
		return "", 0, pc
	}
	n := 0

    // 获取包名
	for i := len(file) - 1; i > 0; i-- {
		if file[i] == '/' {
			n++
			if n >= 2 {
				file = file[i+1:]
				break
			}
		}
	}
	return file, line, pc
}
```

### 文件分割
logrus本身不带日志本地文件分割功能，但是我们可以通过logrus-lumberjack-hook进行日志本地文件分割。

```go
package main

import (
	log "github.com/sirupsen/logrus"
	"time"
	"os"
	"github.com/natefinch/lumberjack"
	"runtime"
	"io"
)

const LogFilePath = "logs/misc.log"

func main() {
	// Setup logger
	lumberjackLogrotate := &lumberjack.Logger{
		Filename:   LogFilePath,
		MaxSize:    5,  // Max megabytes before log is rotated
		MaxBackups: 90, // Max number of old log files to keep
		MaxAge:     60, // Max number of days to retain log files
		Compress:   true,
	}

	log.SetFormatter(&log.TextFormatter{FullTimestamp: true, TimestampFormat: time.RFC1123Z})

	logMultiWriter := io.MultiWriter(os.Stdout, lumberjackLogrotate)
	log.SetOutput(logMultiWriter)

	log.WithFields(log.Fields{
		"Runtime Version": runtime.Version(),
		"Number of CPUs":  runtime.NumCPU(),
		"Arch":            runtime.GOARCH,
	}).Info("Application Initializing")
}
```

### formatter

**简单使用**
logrus 通过 formatter 来定义输出日志的格式,具体例子如下:
```go
package main

import (
	log "github.com/Sirupsen/logrus"
)

func main() {
	formatter := &log.TextFormatter{
    // 不需要彩色日志
		DisableColors:   true, 
    // 定义时间戳格式
		TimestampFormat: "2006-01-02 15:04:05",
	}
	log.SetFormatter(formatter)
	log.Printf("hello world")
}
```
打印日志如下:
```go
time="2019-11-07 17:41:20" level=info msg="hello world"
```
**分析**
本身 formatter 是接口类型,只要实现该结构我们就可以自定义日志输出格式:
```go
// Any additional fields added with `WithField` or `WithFields` are also in
// `entry.Data`. Format is expected to return an array of bytes which are then
// logged to `logger.Out`.
type Formatter interface {
	Format(*Entry) ([]byte, error)
}
```
logrus 提供了两种默认的日志输出格式, TextFormatter和JSONFormatter.上面的示例使用的就是TextFormatter.
```go
type TextFormatter struct {
	// Set to true to bypass checking for a TTY before outputting colors.
	ForceColors bool
  //不使用彩色日志
	DisableColors bool
	// Override coloring based on CLICOLOR and CLICOLOR_FORCE. - https://bixense.com/clicolors/
	EnvironmentOverrideColors bool
  // 是否打印时间戳
	DisableTimestamp bool
	// Enable logging the full timestamp when a TTY is attached instead of just
  // 是否按照时间戳格式打印,置为false则只打印从程序启动到打印日志的时间差(单位:秒)
	FullTimestamp bool
  // 时间戳格式
	TimestampFormat string
  // 设置 fields 不排序
	DisableSorting bool
  // 设置 fields 的排序规则
	SortingFunc func([]string)
	// Disables the truncation of the level text to 4 characters.
	DisableLevelTruncation bool
	// QuoteEmptyFields will wrap empty fields in quotes if true
	QuoteEmptyFields bool
  // 是否打印日志到终端
	isTerminal bool
  // fieldMap
	// As an example:
	// formatter := &TextFormatter{
	//     FieldMap: FieldMap{
	//         FieldKeyTime:  "@timestamp",
	//         FieldKeyLevel: "@level",
	//         FieldKeyMsg:   "@message"}}
	FieldMap FieldMap
  // 设置 func 和 file 这两个 field的输出格式
	CallerPrettyfier func(*runtime.Frame) (function string, file string)
	terminalInitOnce sync.Once
}
```

TextFormatter 实现 Formatter接口
```go
// Format renders a single log entry
func (f *TextFormatter) Format(entry *Entry) ([]byte, error) {
	data := make(Fields)
	for k, v := range entry.Data {
		data[k] = v
	}
  // prefixFieldClashes 删除默认的 4 个 field,防止冲突(msg, level, time, logrus_error)
	prefixFieldClashes(data, f.FieldMap, entry.HasCaller())
	keys := make([]string, 0, len(data))
	for k := range data {
		keys = append(keys, k)
	}
// 拼接待打印日志的各个元素
	var funcVal, fileVal string
// 拼接元素过程省略 ...
	f.terminalInitOnce.Do(func() { f.init(entry) })
// 修改时间戳
	timestampFormat := f.TimestampFormat
	if timestampFormat == "" {
		timestampFormat = defaultTimestampFormat
	}
	// 以下省略 ...
  // 打印换行符
	b.WriteByte('\n')
	return b.Bytes(), nil
}
```

JSONFormatter
```go
// JSONFormatter formats logs into parsable json
type JSONFormatter struct {
	// TimestampFormat sets the format used for marshaling timestamps.
	TimestampFormat string

	// DisableTimestamp allows disabling automatic timestamps in output
	DisableTimestamp bool

	// DataKey allows users to put all the log entry parameters into a nested dictionary at a given key.
	DataKey string

	// FieldMap allows users to customize the names of keys for default fields.
	// As an example:
	// formatter := &JSONFormatter{
	//   	FieldMap: FieldMap{
	// 		 FieldKeyTime:  "@timestamp",
	// 		 FieldKeyLevel: "@level",
	// 		 FieldKeyMsg:   "@message",
	// 		 FieldKeyFunc:  "@caller",
	//    },
	// }
	FieldMap FieldMap

	// CallerPrettyfier can be set by the user to modify the content
	// of the function and file keys in the json data when ReportCaller is
	// activated. If any of the returned value is the empty string the
	// corresponding key will be removed from json fields.
	CallerPrettyfier func(*runtime.Frame) (function string, file string)

	// PrettyPrint will indent all json logs
	PrettyPrint bool
}

```

### 自定义 Formatter
```go
package main

import (
	"bytes"
	"fmt"

	log "github.com/Sirupsen/logrus"
)

func main() {
  // 初始化自定义 formatter
	formatter := &MyFormatter{
		Prefix: "prefix",
		Suffix: "suffix",
	}
	log.SetFormatter(formatter)
	log.Infoln("hello world")
}

// MyFormatter 自定义 formatter
type MyFormatter struct {
	Prefix string
	Suffix string
}

// Format implement the Formatter interface
func (mf *MyFormatter) Format(entry *log.Entry) ([]byte, error) {
	var b *bytes.Buffer
	if entry.Buffer != nil {
		b = entry.Buffer
	} else {
		b = &bytes.Buffer{}
	}
// entry.Message 就是需要打印的日志
	b.WriteString(fmt.Sprintf("%s - %s - %s", mf.Prefix, entry.Message, mf.Suffix))
	return b.Bytes(), nil
}
```
打印结果如下:
```go
prefix - hello world - suffix
```

### 总结使用

为了满足公司日志要求
1.格式
时间 日志等级 msg 文件名行号
```go
2020-04-24 16:00:28.487 info [1] running [marketDataMysql/main.go:336]
```
2.分割
按大小分割,最大保留天数

**代码如下:**
```go
package logrus

import (
	"bytes"
	"fmt"
	"github.com/natefinch/lumberjack"
	log "github.com/sirupsen/logrus"
	"io"
	"os"
	"runtime"
	"strconv"
	"strings"
)


// line number hook for log the call context,
type lineHook struct {
	Field  string
	// skip为遍历调用栈开始的索引位置
	Skip   int
	levels []log.Level
}

// Levels implement levels
func (hook lineHook) Levels() []log.Level {
	return log.AllLevels
}

// Fire implement fire
func (hook lineHook) Fire(entry *log.Entry) error {
	entry.Data[hook.Field] = findCaller(hook.Skip)
	return nil
}

func findCaller(skip int) string {
	file := ""
	line := 0
	//var pc uintptr
	// 遍历调用栈的最大索引为第11层.
	for i := 0; i < 11; i++ {
		file, line, _ = getCaller(skip + i)
		// 过滤掉所有logrus包，即可得到生成代码信息
		if !strings.HasPrefix(file, "logrus") {
			break
		}
	}
	return fmt.Sprintf("%s:%d", file, line)
}

func getCaller(skip int) (string, int, uintptr) {
	pc, file, line, ok := runtime.Caller(skip)
	if !ok {
		return "", 0, pc
	}
	n := 0

	// 获取包名
	for i := len(file) - 1; i > 0; i-- {
		if file[i] == '/' {
			n++
			if n >= 2 {
				file = file[i+1:]
				break
			}
		}
	}
	return file, line, pc
}
// MyFormatter 自定义 formatter
type MyFormatter struct {
}
func getGID() uint64 {
	b := make([]byte, 64)
	b = b[:runtime.Stack(b, false)]
	b = bytes.TrimPrefix(b, []byte("goroutine "))
	b = b[:bytes.IndexByte(b, ' ')]
	n, _ := strconv.ParseUint(string(b), 10, 64)
	return n
}

func (mf *MyFormatter) Format(entry *log.Entry) ([]byte, error) {
	var b *bytes.Buffer
	if entry.Buffer != nil {
		b = entry.Buffer
	} else {
		b = &bytes.Buffer{}
	}
	timeParse:= entry.Time.Format("2006-01-02 15:04:05.000")
	threadId:=getGID()
	var path interface{}
	if _,ok:=entry.Data["path"];ok{
		path=entry.Data["path"]
	}
	b.WriteString(fmt.Sprintf("%s %s [%d] %s [%s]\n", timeParse,entry.Level, threadId, entry.Message,path))
	return b.Bytes(), nil
}

func New(filePath string,maxsize int,maxBackups int,maxAge int,compress bool){
	lumberjackLogrotate := &lumberjack.Logger{
		Filename:   filePath,
		MaxSize:    maxsize,  // Max megabytes before log is rotated
		MaxBackups: maxBackups, // Max number of old log files to keep
		MaxAge:     maxAge, // Max number of days to retain log files
		Compress:   compress,
	}

	formatter := &MyFormatter{
	}
	log.SetFormatter(formatter)
	logMultiWriter := io.MultiWriter(os.Stdout, lumberjackLogrotate)
	log.SetOutput(logMultiWriter)
	hook:=lineHook{Skip:3,Field:"path"}
	log.AddHook(&hook)
}

```

参考资料
* [golang日志框架之logrus](https://blog.csdn.net/wslyk606/article/details/81670713)
* [Lumberjack hook for Logrus #679](https://github.com/sirupsen/logrus/issues/679)
* [logrus 剖析之 formatter](http://www.jssyjam.com/articles/2019/11/08/1573194915335.html)
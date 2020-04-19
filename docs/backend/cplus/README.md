---
title: c++
---

cin.get的参数和cin.getline相同，但是getline会读取换行符并保存到第一个参数中，但是cin.get会将换行符留在输入队列中，所以会导致下一个读取的内容是换行符
cin.getline不适用于string类


```c++
getline(cin, name);
cin.get(name,128);
cin.getline (name,128);
cin>>name;
```
```c++
ST_PIZZA_INFO *pizza_info = new ST_PIZZA_INFO;
delete pizza_info;
```
```c++
// pracitce 4
void p4_4(void)
{
	string first_name;
	string last_name;

	cout << "Enter your first name: ";
	//  cin.getline()  // cin.getline不适用于string类
	getline(cin, first_name);

	cout << "Enter your last name: ";
	getline(cin, last_name);

	cout << "Here's your infomation is a single string: " << last_name << ", " << first_name << endl;
}
```


删除重复数据
```c++
fstream f("C:\\Users\\Entropy\\Desktop\\新建文件夹 (2)\\数据.txt");
	vector<string> words; 
	string line; 
	while(getline(f,line))//会自动把\n换行符去掉 
	{
		int pos = line.find(",");
		string usrName = line.substr(0, pos);
		words.push_back(usrName);
		//cout << usrName << endl;

	} 
	cout << "共有单词数目:" << words.size() << endl;

		// vector<int>::iterator 这个是定义了个迭代器
	vector<string>::iterator it;
	// 先对数据进行排序（必须的）
	sort(words.begin(), words.end());
	// unique()函数就是去重用的
	// 去重原理：找到重复的数据后移动到最后，然后返回第一个重复的元素的地址
	it = unique(words.begin(), words.end());
	// 删掉重复的元素
	words.erase(it, words.end());
	int j=0;
	for (it = words.begin(); it != words.end(); it++)
	{
		cout << *it << " ";
		j++;
	}
	cout << j<<endl;
```


按行读取数据
```c++
	ifstream ifs;
	ifs.open("C:\\Users\\Entropy\\Desktop\\新建文件夹 (2)\\无行情合约.txt", ios::in);
	if (!ifs.is_open())
	{
		cout << "打开失败" << endl;
	}
	char buf[1024];

	while (ifs >>buf) //按行读取
	{
		cout << buf << endl;
	}
	ifs.close();
```
写入数据
```c++
ofstream ofs;
	ofs.open("./test.txt", ios::out | ios::trunc);
	//判断是否打开成功
	if ( !ofs.is_open())
	{
		cout << "打开失败" << endl;
	}

	ofs << "姓名：abc" << endl;
	ofs << "年龄：100" << endl;
	ofs << "性别：男" << endl;


	ofs.close();
```






捕获异常
```c++
	try 
	{
		throw 1;
	}
	catch (...)
	{
		cout << "int类型异常捕获" << endl;
	}

```
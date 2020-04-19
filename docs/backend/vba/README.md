---
title: 各种小脚本
---

## 1.日报报保监模板代码
```vb
Sub 取值()
    pth = ThisWorkbook.Sheets(1).Cells(3, "d").Value & "\"
    
    fn0 = Dir(pth & "*.xls*") '取时间用
    Set d = CreateObject("scripting.dictionary") '存储数据时间的所在列
    Set d2 = CreateObject("scripting.dictionary") '存储 时间+险种+地区 的数据
    Set d0 = CreateObject("scripting.dictionary") '存储文件的时间
    
    d("今日") = "b"
    d("昨日") = "c"
    d("18") = "d"
    d("17") = "e"
    
    '根据每个表的b4单元格的日期判断数据时间
    Do While fn0 <> ""
        Set wb0 = Workbooks.Open(pth & fn0)
            rq = Split(wb0.Sheets(1).Range("b4"), " ")
            If CDate(Mid(rq(1), 3)) - CDate(Mid(rq(0), 6)) = 0 Then
                If Date - CDate(Mid(rq(1), 3)) = 1 Then ''''''''''''''''''''''
                    d0(wb0.Name) = "今日"
                Else
                    d0(wb0.Name) = "昨日"
                End If
            Else
                If Date - CDate(Mid(rq(1), 3)) = 1 Then ''''''''''''''''''''''''
                    d0(wb0.Name) = "18"
                Else
                    d0(wb0.Name) = "17"
                End If
            End If
        wb0.Close True
        
        fn0 = Dir
    Loop
    
    '清空数据
    With ThisWorkbook
        For i = 2 To 16
            For Each rn In [{"b","c","d"}]
                .Sheets("交强险").Range(rn & i) = "**"
                .Sheets("商业险").Range(rn & i) = "**"
                .Sheets("整体").Range(rn & i) = "**"
            Next
        Next
    End With
    
    '存储 时间+险种+地区 的数据,并根据 时间+险种+地区 给 交强险 商业险的工作簿表格赋值
    fn = Dir(pth & "*.xls*")
    Dim arr(), xztype$, diqu$
    Do While fn <> ""
        Set wb = Workbooks.Open(pth & fn)
        riqi = d0(wb.Name)
        na = d(riqi)
        For i = 10 To wb.Sheets(1).UsedRange.Rows.Count - 1
            If wb.Sheets(1).Range("b" & i) = "10030101-交强险" Then
                xztype = "交强险"
            Else
                xztype = "商业险"
            End If
            diqu = Replace(Mid(wb.Sheets(1).Range("c" & i), 8, 10), "分公司", "")
            d2(riqi & xztype & diqu) = wb.Sheets(1).Range("d" & i)
        Next
        
        With ThisWorkbook.Sheets("交强险")
            For i = 3 To 16
                .Range(na & i) = 0
                .Range(na & i) = d2(riqi & "交强险" & .Range("a" & i))
            Next
            .Range(na & "2") = 0
            .Range(na & "2") = d2(riqi & "交强险" & "河南营业本部") + d2(riqi & "交强险" & "郑州")
        End With
        
        With ThisWorkbook.Sheets("商业险")
            For i = 3 To 16
                .Range(na & i) = 0
                .Range(na & i) = d2(riqi & "商业险" & .Range("a" & i))
            Next
            .Range(na & "2") = 0
            .Range(na & "2") = d2(riqi & "商业险" & "河南营业本部") + d2(riqi & "商业险" & "郑州")
        End With
        
        wb.Close True
        fn = Dir
    Loop
    '给整体工作簿复制
    With ThisWorkbook
        .Sheets("交强险").Range("b2:e16").Copy
        .Sheets("整体").Range("b2:e16").PasteSpecial Paste:=xlPasteAll
        .Sheets("商业险").Range("b2:e16").Copy
        .Sheets("整体").Range("b2:e16").PasteSpecial Paste:=xlPasteValues, Operation:=xlPasteSpecialOperationAdd
    End With
    '生成新的车险业务签单数据日报表
    With ThisWorkbook.Sheets("车险业务签单数据日报表")
        .Range("b6:b24") = ThisWorkbook.Sheets(1).Range("b6:b24").Value
        .Range("c6:c24") = ThisWorkbook.Sheets(1).Range("d6:d24").Value
        .Range("d6:d24") = ThisWorkbook.Sheets(1).Range("g6:g24").Value
        .Range("e6:e24") = ThisWorkbook.Sheets(1).Range("h6:h24").Value
        .Range("f6:f24") = ThisWorkbook.Sheets(1).Range("j6:j24").Value
        .Range("g6:g24") = ThisWorkbook.Sheets(1).Range("m6:m24").Value
        .Range("h6:h24") = ThisWorkbook.Sheets(1).Range("n6:n24").Value
        .Range("i6:i24") = ThisWorkbook.Sheets(1).Range("p6:p24").Value
        .Range("j6:j24") = ThisWorkbook.Sheets(1).Range("s6:s24").Value
    End With
    
    '把"#N/A" 替换为"-"
    ThisWorkbook.Sheets("车险业务签单数据日报表").Cells.Replace What:="#N/A", Replacement:="-"
    
    '生成车险业务签单数据日报表,并保存到当前目录下
    Set newbk = Workbooks.Add
    ThisWorkbook.Sheets("车险业务签单数据日报表").Cells.Copy
    newbk.Sheets(1).Range("a1:j25").PasteSpecial Paste:=xlPasteAll
    newbk.Sheets(1).Cells.Replace What:="日期：", Replacement:="日期：" & (Format(Date - 1, "mm.dd"))
    newbk.Sheets(1).Name = "车险业务签单数据日报表"
    
    If Dir(ThisWorkbook.Path & "\" & "车险业务签单数据日报表.xlsx") <> "" Then
        Kill (ThisWorkbook.Path & "\" & "车险业务签单数据日报表.xlsx")
    End If
    
    newbk.SaveAs ThisWorkbook.Path & "\" & "车险业务签单数据日报表.xlsx"
    newbk.Close True
    MsgBox "成功在" & ThisWorkbook.Path & "    目录下生成" & "车险业务签单数据日报表.xlsx"
    
    '释放内存
    Set d = Nothing
    Set d2 = Nothing
    Set d0 = Nothing
End Sub

```
## 2.中介模板代码
```vb
Sub 中介机构()
    
    '所有中介机构
    jigou = [{"百特","美联盛航","松泰","华诚","永丰","融元","金诺","颖海","升铭","安吉好途邦","宏安","华凯","广大","亚钰","国福家庭","安诚保险","华安","天时","瑞丰","浩安"}]
    
    Set d = CreateObject("scripting.dictionary") '存储保单费
    Set d0 = CreateObject("scripting.dictionary ") '存储文件的时间"
    pth1 = "C:\Documents and Settings\Administrator\桌面\新建文件夹 (2)\中介\" ''''''''''''''
    
    fn0 = Dir(pth1 & "*.xls*")
    
    
   '根据每个表的b4单元格的日期判断数据时间
    Do While fn0 <> ""
        Set wb0 = Workbooks.Open(pth1 & fn0)
        'If wb0.Name <> "代理机构车险业务签单保费周报表.xlsx" Then
            riqi = Split(wb0.Sheets(1).Range("b4"), " ")
            If CDate(Mid(riqi(1), 3)) - CDate(Mid(riqi(0), 6)) = 6 Then
                If Date - CDate(Mid(riqi(1), 3)) < 6 Then '''''''''''''''''''''
                    d0(wb0.Name) = "当周"
                    thispn = wb0.Name '当周文件名
                Else
                    d0(wb0.Name) = "上周"
                End If
            Else
                If Date - CDate(Mid(riqi(1), 3)) < 6 Then '''''''''''''''''''''''
                    d0(wb0.Name) = "全年累计保费"
                Else
                    d0(wb0.Name) = "上年累计保费"
                End If
            End If
        'End If
        wb0.Close True
        fn0 = Dir
    Loop
    
    
    fn1 = Dir(pth1 & thispn)
    Set wb1 = Workbooks.Open(pth1 & fn1)
    Dim arr(), t%
    ReDim arr(UBound(jigou))
    '对当周签单保费进行统计,便于后面排序
    For i = 10 To wb1.Sheets(1).UsedRange.Rows.Count
        With wb1.Sheets(1)
            
            For Each jg In jigou
                If .Range("d" & i) Like "*" & jg & "*" Then
                    If .Range("b" & i) = "10030101-交强险" Then
                        d("交强险" & jg) = .Range("e" & i) + d("交强险" & jg)
                    Else
                        d("商业险" & jg) = .Range("e" & i) + d("商业险" & jg)
                    End If
                    
                End If
            Next
        End With
    Next


    wb1.Close True
    
    t = 1
    For Each jg In jigou
        d("总和" & jg) = d("商业险" & jg) + d("交强险" & jg)
        arr(t) = d("总和" & jg)
        t = t + 1
    Next
    t = t - 1
    '用冒泡法对保费从小到大排列
    For n = t To 2 Step -1
        For i = 2 To t
            If arr(i) < arr(i - 1) Then
                s = arr(i)
                arr(i) = arr(i - 1)
                arr(i - 1) = s
            End If
        Next
    Next
    'sheet1表格的数据全部清空，防止混淆历史数据
    With ThisWorkbook.Sheets(1)
        For i = 6 To 10
            .Range("b" & i) = "*#*"
            .Range("j" & i) = "*#*"
            .Range("k" & i) = "*#*"
            .Range("m" & i) = 0
            .Range("o" & i) = "*#*"
            .Range("p" & i) = "*#*"

            .Range("r" & i) = "*#*"
            .Range("s" & i) = "*#*"
            .Range("u" & i) = 0
            .Range("w" & i) = "*#*"
            .Range("x" & i) = "*#*"
        Next
    End With
    
    '将排名前五的机构名称和当周签单保费填入
    For i = 1 To 5
        For Each jg In jigou
            With ThisWorkbook.Sheets(1)
                If d("总和" & jg) = arr(t - i + 1) Then
                    .Range("a" & (i + 5)) = jg
                    .Range("b" & (i + 5)) = d("总和" & jg)
                End If
            End With
        Next
    Next




    '存储 时间+险种+机构 的数据
    fn2 = Dir(pth1 & "*.xls*")

    Do While fn2 <> ""
         Set wb2 = Workbooks.Open(pth1 & fn2)
         na = d0(wb2.Name)
         With wb2.Sheets(1)
            For Each jg In jigou
                For i = 10 To .UsedRange.Rows.Count
                    If .Range("d" & i) Like "*" & jg & "*" Then
                        If .Range("b" & i) = "10030101-交强险" Then
                            d(na & "交强险" & jg) = .Range("e" & i) + d(na & "交强险" & jg)
                        Else
                            d(na & "商业险" & jg) = .Range("e" & i) + d(na & "商业险" & jg)
                        End If
                    End If
                Next
            Next
        End With
        wb2.Close True
        fn2 = Dir
    Loop

    '根据 时间+险种+机构 给工作簿表格赋值
   For i = 6 To 10
        With ThisWorkbook.Sheets(1)
            .Range("j" & i) = d(.Range("j5") & "交强险" & .Range("a" & i))
            .Range("k" & i) = d(.Range("k5") & "交强险" & .Range("a" & i))
            .Range("o" & i) = d(.Range("o5") & "交强险" & .Range("a" & i))
            .Range("p" & i) = d(.Range("p5") & "交强险" & .Range("a" & i))

            .Range("r" & i) = d(.Range("r5") & "商业险" & .Range("a" & i))
            .Range("s" & i) = d(.Range("s5") & "商业险" & .Range("a" & i))
            .Range("w" & i) = d(.Range("w5") & "商业险" & .Range("a" & i))
            .Range("x" & i) = d(.Range("x5") & "商业险" & .Range("a" & i))

        End With
   Next
    '生成新的工作簿
    With ThisWorkbook.Sheets(2)
        .Range("a6:a10") = ThisWorkbook.Sheets(1).Range("a6:a10").Value
        .Range("d6:d10") = ThisWorkbook.Sheets(1).Range("b6:b10").Value
        .Range("e6:e10") = ThisWorkbook.Sheets(1).Range("d6:d10").Value
        .Range("f6:f10") = ThisWorkbook.Sheets(1).Range("f6:f10").Value
        .Range("g6:g10") = ThisWorkbook.Sheets(1).Range("g6:g10").Value
        .Range("h6:h10") = ThisWorkbook.Sheets(1).Range("i6:i10").Value
        .Range("i6:i10") = ThisWorkbook.Sheets(1).Range("j6:j10").Value
        .Range("j6:j10") = ThisWorkbook.Sheets(1).Range("l6:l10").Value
        .Range("k6:k10") = ThisWorkbook.Sheets(1).Range("n6:n10").Value
        .Range("l6:l10") = ThisWorkbook.Sheets(1).Range("o6:o10").Value
        .Range("m6:m10") = ThisWorkbook.Sheets(1).Range("q6:q10").Value
        .Range("n6:n10") = ThisWorkbook.Sheets(1).Range("r6:r10").Value
        .Range("o6:o10") = ThisWorkbook.Sheets(1).Range("t6:t10").Value
        .Range("p6:p10") = ThisWorkbook.Sheets(1).Range("v6:v10").Value
        .Range("q6:q10") = ThisWorkbook.Sheets(1).Range("w6:w10").Value
        .Range("r6:r10") = ThisWorkbook.Sheets(1).Range("y6:y10").Value
    End With
    '替换
    ThisWorkbook.Sheets(2).Cells.Replace What:="#DIV/0!", Replacement:="-"
    ThisWorkbook.Sheets(2).Cells.Replace What:="*#*", Replacement:="-"
    '代理机构车险业务签单保费周报表,并保存到当前目录下
    Set newbk = Workbooks.Add
    ThisWorkbook.Sheets(2).Cells.Copy
    newbk.Sheets(1).Cells.PasteSpecial Paste:=xlPasteAll
    newbk.Sheets(1).Name = "代理机构车险业务签单保费周报表"

    If Dir(ThisWorkbook.Path & "\" & "代理机构车险业务签单保费周报表.xlsx") <> "" Then
        Kill (ThisWorkbook.Path & "\" & "代理机构车险业务签单保费周报表.xlsx")
    End If

    newbk.SaveAs ThisWorkbook.Path & "\" & "代理机构车险业务签单保费周报表.xlsx"
    newbk.Close True
    Set d = Nothing
    Set d2 = Nothing
    MsgBox "成功在" & ThisWorkbook.Path & "    目录下生成" & "代理机构车险业务签单保费周报表.xlsx"
End Sub
```
## 3.批单重计提
```vb
Private Sub CommandButton1_Click()
    Dim mulu1$, pidan$
    
    Set d = CreateObject("scripting.dictionary") '创建字典，存储 险种+保单号 的签单保费，用来查找批单的原始保费
    
    Dim starttime As Double
    starttime = Timer
    mulu1 = TextBox1.Value

    pidan = TextBox3.Value

   If mulu1 = "" Then
        MsgBox "目录未设置"
   End If
   If pidan = "" Then
        MsgBox "批单文件名未设置"
   End If

   If mulu1 = "" Or pidan = "" Then
        Exit Sub
   End If
    '忽略错误继续执行VBA代码
    On Error Resume Next
    '存储所有核保日期的 险种+保单号 的签单保费
    pth = mulu1 & "\"
    fn = Dir(pth & "*.xls")
    k = 1
    Application.DisplayAlerts = False
    Application.ScreenUpdating = False
    Do While fn <> ""
        Set wb = Workbooks.Open(pth & fn)
        If wb.Name <> pidan Then
        rownum = wb.Sheets(1).UsedRange.Rows.Count
        With wb.Sheets(1)
            For t = 4 To (rownum - 13)
                d(.Range("a" & t) & .Range("l" & t)) = .Range("af" & t)
            Next

        End With
        k = k + rownum - 16
        End If
        wb.Close True
        fn = Dir
    Loop


    fn2 = Dir(pth & pidan)


    Set wb2 = Workbooks.Open(pth & fn2)

    '新建一个工作簿用来保存批单的重计提
    Set newbk = Workbooks.Add
    
    wb2_rownum = wb2.Sheets(1).UsedRange.Rows.Count
    
    ThisWorkbook.Sheets(2).Cells.Copy
    newbk.Sheets(1).Cells.PasteSpecial Paste:=xlPasteAll '把sheet2中的所有内容粘贴到新工作簿中,并且粘贴的格式不变
    
    '把批单的的数据复制到模版中
    With wb2.Sheets(1)
        .Range("c4", "d" & wb2_rownum).Copy newbk.Sheets(1).Range("b3", "c" & wb2_rownum)
        .Range("a4", "a" & wb2_rownum).Copy newbk.Sheets(1).Range("d3", "d" & wb2_rownum)
        .Range("b4", "b" & wb2_rownum).Copy newbk.Sheets(1).Range("e3", "e" & wb2_rownum)
        .Range("k4", "k" & wb2_rownum).Copy newbk.Sheets(1).Range("f3", "f" & wb2_rownum)
        .Range("l4", "l" & wb2_rownum).Copy newbk.Sheets(1).Range("g3", "g" & wb2_rownum)
        .Range("i4", "j" & wb2_rownum).Copy newbk.Sheets(1).Range("h3", "i" & wb2_rownum)
        .Range("w4", "w" & wb2_rownum).Copy newbk.Sheets(1).Range("j3", "j" & wb2_rownum)
        .Range("t4", "u" & wb2_rownum).Copy newbk.Sheets(1).Range("k3", "l" & wb2_rownum)
        .Range("y4", "y" & wb2_rownum).Copy newbk.Sheets(1).Range("m3", "m" & wb2_rownum)
        .Range("ac4", "ac" & wb2_rownum).Copy newbk.Sheets(1).Range("n3", "n" & wb2_rownum)
        .Range("ai4", "ai" & wb2_rownum).Copy newbk.Sheets(1).Range("p3", "p" & wb2_rownum)
        .Range("au4", "au" & wb2_rownum).Copy newbk.Sheets(1).Range("q3", "q" & wb2_rownum)
        .Range("av4", "av" & wb2_rownum).Copy newbk.Sheets(1).Range("r3", "r" & wb2_rownum)
        .Range("ao4", "ao" & wb2_rownum).Copy newbk.Sheets(1).Range("s3", "s" & wb2_rownum)
        .Range("am4", "am" & wb2_rownum).Copy newbk.Sheets(1).Range("t3", "t" & wb2_rownum)
        .Range("aq4", "aq" & wb2_rownum).Copy newbk.Sheets(1).Range("v3", "v" & wb2_rownum)
        .Range("ax4", "ax" & wb2_rownum).Copy newbk.Sheets(1).Range("x3", "x" & wb2_rownum)
        .Range("ay4", "ay" & wb2_rownum).Copy newbk.Sheets(1).Range("z3", "z" & wb2_rownum)
        .Range("bc4", "bc" & wb2_rownum).Copy newbk.Sheets(1).Range("ab3", "ab" & wb2_rownum)
        .Range("af4", "af" & wb2_rownum).Copy newbk.Sheets(1).Range("bt3", "bt" & wb2_rownum)
    End With
    
    '利用公式进行重计提
    With newbk.Sheets(1)
        For i = 3 To wb2_rownum
            If d(.Range("d" & i) & .Range("g" & i)) Then
                 .Range("bu" & i) = d(.Range("d" & i) & .Range("g" & i)) '查找批单的原始保费
            End If
             .Range("o" & i) = "=P" & i & "+Q" & i & "+R" & i & "+S" & i & "+T" & i & "+U" & i & ""
             .Range("ad" & i) = "=O" & i & "+X" & i & "+Z" & i & "+AB" & i & ""
             .Range("af" & i) = "=AG" & i & "+AH" & i & "+AI" & i & "+AJ" & i & ""
             .Range("ag" & i) = "=IF(BF" & i & "=0,0,IF(D" & i & "=""交强险"",(BU" & i & "*BF" & i & "+BT" & i & "*4%)/BV" & i & "/(IF(BF" & i & "=P" & i & "*1.06,1.06,1.03)),IF(J" & i & "=""旧车"",(BU" & i & "*BF" & i & "+BT" & i & "*22%)/BV" & i & "/(IF(BF" & i & "=P" & i & "*1.06,1.06,1.03)),(BU" & i & "*BF" & i & "+BT" & i & "*27%)/BV" & i & "/(IF(BF" & i & "=P" & i & "*1.06,1.06,1.03)))))"

             .Range("ah" & i) = "=IF(BG" & i & "=0,0,IF(D" & i & "=""交强险"",(BU" & i & "*BG" & i & "+BT" & i & "*4%)/BV" & i & ",IF(J" & i & "=""旧车"",(BU" & i & "*BG" & i & "+BT" & i & "*22%)/BV" & i & ",(BU" & i & "*BG" & i & "+BT" & i & "*27%)/BV" & i & ")))"
             .Range("ai" & i) = "=(BU" & i & "*BH" & i & "+BT" & i & "*0%)/BV" & i & ""
             .Range("aj" & i) = "=IF(BI" & i & "=0,0,IF(D" & i & "=""交强险"",(BU" & i & "*BI" & i & "+BT" & i & "*4%)/BV" & i & "/1.06,IF(J" & i & "=""旧车"",(BU" & i & "*BI" & i & "+BT" & i & "*22%)/BV" & i & "/1.06,(BU" & i & "*BI" & i & "+BT" & i & "*27%)/BV" & i & "/1.06)))"
             .Range("as" & i) = "=(BU" & i & "*BR" & i & "+BT" & i & "*0%)/BV" & i & ""
             .Range("au" & i) = "=AO" & i & "+AQ" & i & "+AS" & i & "+AF" & i & ""
             .Range("aw" & i) = "=BV" & i & ""
             .Range("ax" & i) = "=AW" & i & "*AD" & i & ""
             .Range("ay" & i) = "=AW" & i & "*AU" & i & ""
             .Range("az" & i) = "=AY" & i & "-AX" & i & ""
             .Range("bb" & i) = "09-自律原因"
             .Range("bf" & i) = "=P" & i & "*1.06"
             .Range("bg" & i) = "=Q" & i & ""
             .Range("bh" & i) = "=R" & i & ""
             .Range("bi" & i) = "=S" & i & "*1.06"
             .Range("br" & i) = "=AB" & i & ""
             .Range("bv" & i) = "=BT" & i & "+BU" & i & ""
        Next
        .Range("o" & 3, "au" & wb2_rownum).Style = "百分比"
        .Range("o" & 3, "au" & wb2_rownum).NumberFormatLocal = "0.00%"
        .Range("aw" & 3, "az" & wb2_rownum).NumberFormatLocal = "0.00"
        .Range("bf" & 3, "br" & wb2_rownum).Style = "百分比"
        .Range("bf" & 3, "br" & wb2_rownum).NumberFormatLocal = "0.00%"
    End With
    
    
    If Dir(mulu1 & "\" & "车险业务费用重计提模板（" & Mid(Date - 1, 6, 10) & "）.xlsx") <> "" Then
        Kill (mulu1 & "\" & "车险业务费用重计提模板（" & Mid(Date - 1, 6, 10) & "）.xlsx")
    End If
    
    newbk.SaveAs mulu1 & "\" & "车险业务费用重计提模板（" & Mid(Date - 1, 6, 10) & "）.xlsx"
    
    wb2.Close True
    newbk.Close True
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
    UserForm1.Hide
    MsgBox "重计提成功!" & Chr(10) & "此次重计提耗时:" & Round((Timer - starttime), 0) & "秒" & Chr(10) & "文件目录为:" & mulu1, , "提示"
    Set d = Nothing
End Sub

```

注释:日报报保监模板表格记录的是河南省各市的分机构签单保费的日报表。
该报表说明:首先是查看河南省各市的分机构的收益情况，然后和昨日的环比，就是看看保费是否有增或减少以及那个波动比率，如果波动比较大，可能这个分机构员工懈怠，这个地区被同行业的挤兑情况，然后今年1月1号到今天这个日期与去年一月一号到去年的这个日期的保费的同比，就是查看总体的保费的收益情况。
中介模板记录的是河南省各个代理机构代理太平财险的保费收益周报表。
该报表说明:指标有今日和昨日的环比，保费和全省的保费规模的之比，今日和昨日的环比就是看这个代理机构的发展趋势，占全省保费的比率就是看这个代理机构的规模大小，这两个参数就可以很好的了解到各个代理机构，有利于发掘良好的合作伙伴公司。
还有个批单重计提，就是如果前台的录单人员把保单的信息录入错误的话，就会产生个前后的保费差额，这个就是看前台人员的工作认真情况。






## 4.http获取行情
```vb
Private Sub Workbook_BeforeClose(Cancel As Boolean)
    'Application.OnTime RunWhen, "refresh", , schedule:=False
End Sub

Private Sub Workbook_Open()

    Call refresh
End Sub






Public CtronlReFresh As Integer

Sub refresh()
    On Error Resume Next
    
    RunWhen = Now + TimeValue("00:00:10") 'Ê±¼ä¼ä¸ô
    'ThisWorkbook.Save
    Application.OnTime RunWhen, "refresh" '¶¨Ê±Æô¶¯³ÌÐò
    If CtronlReFresh = 1 Then
        Exit Sub
    End If
    
    
    Dim LastPrice$, PreSettlementPrice$, GetParams$, InstrumentIdNum&
    LastPrice = "lastPrice"
    PreSettlementPrice = "preSettlementPrice"
    'Set SetingMap = CreateObject("scripting.dictionary")
    Set InstrumentIdMap = CreateObject("scripting.dictionary")
    Set InstrumentInfoMap = CreateObject("scripting.dictionary")
    GetParams = "instrumentId="
    InstrumentIdNum = 0
    Dim strRespText$, tt$, i&, DW$
    Dim URL
    '192.168.18.141:9568
    '192.168.13.85:9090
    '192.168.13.85:9568
    '11
    'http://km.sycapital.com.cn:19568
    'http://km.sycapital.com.cn:19568/getmarket?instrumentId=CME.ES2003
    URL = "http://km.sycapital.com.cn:19568/getmarket?"
    With ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý")
        For i = 2 To 100
            
            If Not IsEmpty(.Range("a" & i)) Then
                InstrumentIdNum = InstrumentIdNum + 1
                'SetingMap(.Range("a" & i) & LastPrice) = .Range("b" & i)
                'SetingMap(.Range("a" & i) & PreSettlementPrice) = .Range("c" & i)
                
                
                InstrumentInfoMap(.Range("a" & i).Value & LastPrice) = 0
                InstrumentInfoMap(.Range("a" & i).Value & PreSettlementPrice) = 0
                InstrumentIdMap(.Range("a" & i).Value) = .Range("a" & i)
            Else
                If i < 3 Then
                    MsgBox "¾¯¸æ!Ã»ÓÐÉèÖÃ²ÎÊý!!!"
                    Exit Sub
                End If
                
                Exit For
            End If
        Next
    End With
    
    For Each element In InstrumentIdMap.Keys
        If GetParams = "instrumentId=" Then
                GetParams = GetParams & element
            Else
                GetParams = GetParams & "," & element
        End If
    Next

    
    Static id As Long
    id = id + 1
    If id >= 60000 Then
        id = 0
    End If
    
    URL = URL & GetParams & "&i=" & id
    
    Dim http
    Set http = CreateObject("Microsoft.XMLHTTP")

    http.Open "GET", URL, False
    http.send

    If http.Status = 200 Then
        tt = http.responseText
        ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý").Range("j13").Value = tt
    Else
        CtronlReFresh = 1
        MsgBox "ÇëÇó³¬Ê±£¬ÐÐÇéÒÑÍ£Ö¹½ÓÊÕ"
        ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý").Range("j13").Value = "httpÇëÇóÊ§°Ü"
        Exit Sub
    End If
    'Do
'        With CreateObject("Microsoft.XMLHTTP")
'            .Open "GET", URL, False
'            .send
'            tt = .responseText
'            With CreateObject("new:{1C3B4210-F441-11CE-B9EA-00AA006B1A69}")
'                .SetText tt
'                .PutInClipboard
'            End With
'            tt = BytesToBstr(.ResponseBody, "GB2312")
'        End With
    'Do

        Dim objRegEx As Object
        Set objRegEx1 = CreateObject("vbscript.regexp")
        Set objRegEx2 = CreateObject("vbscript.regexp")
    
    
        For Each element In InstrumentIdMap.Keys
            objRegEx1.Pattern = """" & element & "." & LastPrice & """" & ":(.*?)[, }]"
            objRegEx2.Pattern = """" & element & "." & PreSettlementPrice & """" & ":(.*?)[, }]"
            Set objMH1 = objRegEx1.Execute(tt)
            Set objMH2 = objRegEx2.Execute(tt)
            If objMH1.Count > 0 Then
                Debug.Print objMH1(0).submatches(0)
                InstrumentInfoMap(element & LastPrice) = Val(objMH1(0).submatches(0))
            End If
            If objMH2.Count > 0 Then
                Debug.Print objMH2(0).submatches(0)
                InstrumentInfoMap(element & PreSettlementPrice) = Val(objMH2(0).submatches(0))
            End If
        Next element
        
    
        
        Dim Inst
        With ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý")
            For i = 2 To (2 + InstrumentIdNum)
                If Not IsEmpty(.Range("a" & i)) Then
                    Inst = .Range("a" & i).Value

                    'Debug.Print Inst, .Range("d" & i)
                    If Not IsEmpty(.Range("d" & i)) And Not IsEmpty(.Range("b" & i)) Then
                        If Not InstrumentInfoMap(Inst & LastPrice) = 0 Then
                            ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý").Range("e" & i).Value = "ºÏÔ¼:" & Inst & "ÊµÊ±ÐÐÇé»ñÈ¡³É¹¦"
                            ThisWorkbook.Sheets(.Range("d" & i).Value).Range(.Range("b" & i).Value) = InstrumentInfoMap(Inst & LastPrice)
                        Else
                            ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý").Range("e" & i).Value = "ºÏÔ¼:" & Inst & "ÊµÊ±ÐÐÇé»ñÈ¡Ê§°Ü"
                        End If
                        
                    End If
                    If Not IsEmpty(.Range("d" & i)) And Not IsEmpty(.Range("c" & i)) Then
                        If Not InstrumentInfoMap(Inst & PreSettlementPrice) = 0 Then
                            ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý").Range("f" & i).Value = "ºÏÔ¼:" & Inst & "Ç°ÈÕ½áËã¼Û»ñÈ¡³É¹¦"
                            ThisWorkbook.Sheets(.Range("d" & i).Value).Range(.Range("c" & i).Value) = InstrumentInfoMap(.Range("a" & i) & PreSettlementPrice)
                        Else
                            ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý").Range("f" & i).Value = "ºÏÔ¼:" & Inst & "Ç°ÈÕ½áËã¼Û»ñÈ¡Ê§°Ü"
                        End If
                    End If
                    ThisWorkbook.Sheets("ÅäÖÃ²ÎÊý").Range("j10").Value = "ÉÏ´ÎË¢ÐÂÊ±¼ä:" & Time
                
                End If
            Next
        End With
        
        'Application.Wait Now + TimeValue("0:00:10")
    'Loop
    
    Set InstrumentIdMap = Nothing
    Set InstrumentInfoMap = Nothing
    Set objRegEx2 = Nothing
    Set objRegEx1 = Nothing
    Set http = Nothing
    'Debug.Print CtronlReFresh
    CtronlReFresh = 0
End Sub

Sub stop_refresh()
    CtronlReFresh = 1
    MsgBox "ÐÐÇéÒÑÍ£Ö¹½ÓÊÕ"
        'On Error Resume Next
        'Application.OnTime t + TimeValue("00:00:05"), "refresh", False
        'Application.OnTime t, "refresh", , False 'Í£Ö¹³ÌÐòÔËÐÐ

End Sub

Sub start_refresh()
    CtronlReFresh = 0
    MsgBox "ÐÐÇéÕý¿ªÊ¼½ÓÊÕ"
End Sub
```
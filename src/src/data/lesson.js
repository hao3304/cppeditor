export default [

  {
    name: 'Hello World!',
    demo: `
#include<stdio.h>
int main()
{
	printf("hello world!\\n");
  	return 0;
}
    `,
    content: `
# Hello World!
\`\`\`C
#include<stdio.h>               //预处理，包含头文件
int main()                      //主函数，程序起点
{
    printf("Hello World!\\n");   //输出字符串到标准输出
    return 0;                   //程序返回值
}
\`\`\`

## 预处理器
\`\`\`C
#define PI 3.14159
#include <stdio.h>
\`\`\`
## 函数
\`\`\`
main()函数
printf()函数
\`\`\`
## 返回值

## 语句基本构成
\`\`\`
分号结尾
花括号包含程序块
\`\`\`

# 常量和变量
## 常量
\`\`\`
1,2,3
5.0,8.0,11.5
'a','b','c'
'1','2','3'
\`\`\`
## 变量属性
\`\`\`
名称
值
类型
\`\`\`

## 变量类型
### 整数
\`\`\`C
int i = 9;
\`\`\`
### 浮点数
\`\`\`C
float f = 2.3;
\`\`\`
### 字符
\`\`\`C
char c = 'Z';
\`\`\`
    `
  },
  {
    name: 'C程序基本结构',
    demo:`
    #include <stdio.h>  
int main() {  
    int a, b, c, score; 
    a = 90;
    b = 100;
    c = 90;
    score = a*20/100 + b*30/100+c*50/100;
    printf("%d",score);  
    return 0;  
} `,
    content:`
    # 第二讲 C程序基本结构（续）
## 运算和赋值表达式
【问题描述】
牛牛最近学习了 C++入门课程，这门课程的总成绩计算方法是：
总成绩 = 作业成绩 × 20% + 小测成绩 × 30% + 期末考试成绩 × 50%
牛牛想知道，这门课程自己最终能得到多少分。
说明：
1. 三个非负整数a、b、c，分别表示牛牛的作业成绩、小测成绩和期末考试成绩。
2. 三项成绩满分都是 100 分。
3.  0 ≤ a、b、c ≤ 100 且 a、b、c 都是 10 的整数倍。

\`\`\`C
#include <stdio.h>  
int main() {  
    int a, b, c, score; 
    a = 90;
    b = 100;
    c = 90;
    score = a*20/100 + b*30/100+c*50/100;
    printf("%d",score);  
    return 0;  
}  
\`\`\`

动动手：修改上述程序中的a,b,c的值，观察输出结果。

## 循环

\`\`\`C
#include <stdio.h>  
int main() {  
    int i; 
    for (i=0;i<10;i=i+1)
    printf("%d\\n",i);  
    return 0;  
}  
\`\`\`
## 条件表达式
\`\`\`C
#include <stdio.h>  
int main() {  
    int t; 
    printf("Please input the temperature:\\n");
    scanf("%d",&t);
    if(t>=30)
        printf("It's hot!\\n");  
    else
        printf("It's not hot!\\n");
    return 0;  
}  
\`\`\`
    `
  }

]

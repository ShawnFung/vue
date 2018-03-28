## TypeScript 语法

### 字符串新特性
1. 模板字符串  
用`（反引号）标识，用${}将变量括起来
```
var text = `He is ${person.name} and we wish to know his ${person.age}. that is all`
);
```
- 在${}中的大括号里可以放入任意的JavaScript表达式，还可以进行运算
- 模版字符串还可以调用函数
- 如果使用模版字符串表示多行字符串，所有的空格和缩进都会被保存在输出中！！
2. 自动拆分字符串


### 参数新特性
1. 类型申明  
可以对变量、参数、返回值进行类型申明
```
var name: string = 'Jhon'
```

- 类型推断。第一次赋值，会进行类型推断，所以就算没有显示的申明变量的类型，编译器也会进行推断
```
var name = 'Jhon'
name = 13;  // 编译器报错
```
- 自定义类型申明
Q: interface 可以作为自定义类型吗？
```
class Person{
    name: string
}
var personA: Person = new Person()
```

2. 参数默认值
```
function person(name: string = 'Jhon'){
    ...
}
```
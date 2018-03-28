## json 格式创建 TypeScript 对象

方案一：Object.assign(target, ...sources)
```
class Foo {
  name: string;
  getName(): string { return this.name };
}

let fooJson: string = '{"name": "John Doe"}';
let foo: Foo = Object.assign(new Foo(), JSON.parse(fooJson));

console.log(foo.getName()); //returns John Doe
```

方案二：Object.assign(target, ...sources) + 构造函数
```
class Foo {
  constructor(myObj){
     Object.assign(this, myObj);
  }
  get name() { return this._name; }
  set name(v) { this._name = v; }
}

let foo = new Foo({ name: "bat" });
foo.toJSON() //=> your json ...
```

方案三：Serializable基类
```
class Serializable {
    fillFromJSON(json: string) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}

class Foo extends Serializable {
    name: string;
    GetName(): string { return this.name }
}

var foo = new Foo();
foo.fillFromJSON(json);
```

### 参考文档
- [TypeScript通过json格式创建对象](https://segmentfault.com/q/1010000009294343)
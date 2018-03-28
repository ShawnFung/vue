## 如何使用 TypeScript 写 Vue.js 组件？

### 创建一个基本项目
```
// src/index.ts

import Vue from "vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
    </div>`,
    data: {
        name: "World"
    }
});
```

### 添加一个组件
```
// src/components/Hello.ts

import Vue from "vue";

export default Vue.extend({
    template: `
        <div>
            <div>Hello {{name}}{{exclamationMarks}}</div>
            <button @click="decrement">-</button>
            <button @click="increment">+</button>
        </div>
    `,
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
```

### 单文件组件
- We had to write ```<script lang="ts">``` to get it working with TypeScript
- We had to import the component with the .vue extension in index.ts
```
<!-- src/components/Hello.vue -->

<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
```

### 使用装饰器去定义一个组件，需要使用 vue-class-component 和 vue-property-decorator 插件
```
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class HelloDecorator extends Vue {
    @Prop() name: string;
    @Prop() initialEnthusiasm: number;
    enthusiasm = this.initialEnthusiasm;
    increment() {
        this.enthusiasm++;
    }
    decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }
    get exclamationMarks(): string {
        return Array(this.enthusiasm + 1).join('!');
    }
}
```
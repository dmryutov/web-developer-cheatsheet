# Vue.js

- [Описание](#описание)
- [Кто использует](#кто-использует)
- [Установка](#установка)
- [Использование](#использование)
- [Выражения](#выражения)
- [Директивы](#директивы)
- [Рендеринг списков](#рендеринг-списков)
- [Binding](#binding)
- [Actions / events](#actions--events)
- [Структура компонента](#структура-компонента)
- [Пользовательские события](#пользовательские-события)
- [Жизненный цикл компонента](#жизненный-цикл-компонента)
- [Использование одного слота](#использование-одного-слота)
- [Использование нескольких слотов](#использование-нескольких-слотов)
- [Полезные ссылки](#полезные-ссылки)

## Описание
**Vue.js** — это прогрессивный фреймворк для создания пользовательских интерфейсов. В отличие от фреймворков-монолитов, Vue создан пригодным для постепенного внедрения. Его ядро в первую очередь решает задачи уровня представления (view), что упрощает интеграцию с другими библиотеками и существующими проектами. С другой стороны, Vue полностью подходит и для создания сложных одностраничных приложений (SPA, Single-Page Applications), если использовать его совместно с современными инструментами и дополнительными библиотеками.



## Кто использует

- GitLab
- Facebook ([Newsfeed](https://newsfeed.fb.com/?lang=en))
- Netflix (internal apps)
- Xiaomi
- Alibaba
- EuroNews
- Laracasts
- Codeship



## Установка

```bash
# Установка пакета
sudo npm install -g @vue/cli
```



## Использование

```bash
# Генерация приложения
vue create project_name
cd project_name
# Запуск для разработки
npm run serve
# Сборка проекта
npm run build
```



## Выражения

```jsx
<div id="app">
	<p>I have a {{ product }}</p>
	<p>{{ product + 's' }}</p>
	<p>{{ isWorking ? 'YES' : 'NO' }}</p>
	<p>{{ product.getSalePrice() }}</p>
</div>
```



## Директивы

```jsx
// Element inserted/removed based on truthiness
<p v-if="inStock">{{ product }}</p>

<p v-else-if="onSale">...</p>
<p v-else>...</p>

// Toggles the display: none CSS property
<p v-show="showProductDetails">...</p>

// Two-way data binding
<input v-model="firstName" >

<... v-model.lazy="..." >   // Syncs input after change event
<... v-model.number="..." > // Always returns a number
<... v-model.trim="..." >   // Strips whitespace
```



## Рендеринг списков

```jsx
// Key always recommended
<li v-for="item in items" :key="item.id">
	{{ item }}
</li>

// To access the position in the array
<li v-for="(item, index) in items">...

// To iterate through objects
<li v-for="(value, key) in object">...

// Using v-for with a component
<cart-product v-for="item in products" :product="item" :key="item.id">
```



## Binding

```jsx
<a v-bind:href="url">...</a>
<a :href="url">...</a> // Shorthand

// True or false will add or remove attribute
<button :disabled="isButtonDisabled">...

// If isActive is truthy, the class ‘active’ will appear
<div :class="{ active: isActive }">...

// Style color set to value of activeColor
<div :style="{ color: activeColor }">
```



## Actions / events

```jsx
// Calls addToCart method on component
<button v-on:click="addToCart">...
<button @click="addToCart">... // Shorthand

// Arguments can be passed
<button @click="addToCart(product)">...

// To prevent default behavior (e.g. page reload)
<form @submit.prevent="addProduct">...

// Only trigger once
<img @mouseover.once="showImage">...

.stop // Stop all event propagation
.self // Only trigger if event.target is element itself

// Keyboard entry example
<input @keyup.enter="submit">

// Call onCopy when control-c is pressed
<input @keyup.ctrl.c="onCopy">
```

Key modifiers:

- `.tab`
- `.delete`
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

Mouse modifiers:

- `.left`
- `.right`
- `.middle`



## Структура компонента

```javascript
Vue.component('my-component', {
	// Components that can be used in the template
	components: {
		ProductComponent, ReviewComponent
	},
	// The parameters the component accepts
	props: {
		message: String,
		product: Object,
		email: {
			type: String,
			required: true,
			default: "none",
			validator: function (value) {
				// Should return true if value is valid
			}
		}
	},
	// Must be a function
	data: function() {
		return {
			firstName: 'Vue',
			lastName: 'Mastery'
		}
	},
	// Return cached values until dependencies change
	computed: {
		fullName: function () {
			return this.firstName + ' ' + this.lastName
		}
	},
	watch: {
		// Called when firstName changes val
		firstName: function (value, oldValue) { ... }
	},
	methods: { ... },
	// Can also use backticks for multi-line
	template: '<span>{{ message }}</span>',
})
```



## Пользовательские события

```jsx
// Use props (above) to pass data into child components, custom events to pass data to parent elements.
// Set listener on component, within its parent
<button-counter v-on:incrementBy="incWithVal">

// Inside parent component
methods: {
	incWithVal: function (toAdd) { ... }
}

// Inside button-counter template
this.$emit('incrementBy', 5) // Data sent up to parent
```


## Жизненный цикл компонента

![Vue Lifecycle](files/vue_lifecycle.png)



## Использование одного слота

```jsx
// Component template
<div>
	<h2>I'm a title</h2>
	<slot>
		Only displayed if no slot content
	</slot>
</div>

// Use of component with data for slot
<my-component>
	<p>This will go in the slot</p>
</my-component>
```



## Использование нескольких слотов

```jsx
// Component template
<div class="container">
	<header>
		<slot name="header"></slot>
	</header>
	<main>
		<slot>Default content</slot>
	</main>
	<footer>
		<slot name="footer"></slot>
	</footer>
</div>

// Use of component with data for slot
<app-layout>
	<h1 slot="header">Page title</h1>
	<p>the main content.</p>
	<p slot="footer">Contact info</p>
</app-layout>
```



## Полезные ссылки

- [Документация](https://ru.nuxtjs.org/guide/)
- [Официально одобренные пакеты](https://github.com/vuejs/awesome-vue)
- [Полезные ссылки](https://translation-gang.github.io/vue-patterns/ru/useful-links/)
- Курс [Vue JS 2 - The Complete Guide](https://www.udemy.com/vuejs-2-the-complete-guide/) ([бесплатно](https://freecoursesite.com/vue-js-2-the-complete-guide-incl-vue-router-vuex-1/))
- [Vue.js Cheat Sheet](https://www.vuemastery.com/vue-cheat-sheet/)
- Тестирование
	- [Vue Test Utils](https://vue-test-utils.vuejs.org/ru/)
	- [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/)
	- [Structuring and testing a Vue/Vuex](https://medium.com/@lachlanmiller_52885/structuring-and-testing-a-vue-vuex-app-with-vue-test-utils-80a994b819f)
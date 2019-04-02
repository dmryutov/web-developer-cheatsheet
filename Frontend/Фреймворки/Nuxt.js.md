# Nuxt

- [Описание](#описание)
- [Возможности](#возможности)
- [Установка](#установка)
- [Использование](#использование)
- [Структура папок](#структура-папок)
- [Страницы](#страницы)
- [Компоненты Nuxt](#компоненты-nuxt)
- [Псевдонимы для директорий](#псевдонимы-для-директорий)
- [Vuex store](#vuex-store)
- [nuxt.config.js](#nuxt.config.js)
- [Способы развертывания](#способы-развертывания)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Nuxt.js** — это фреймворк для универсальных приложений на Vue.js.

Основной задачей этого фреймворка является **рендеринг пользовательского интерфейса** в условиях абстракции от клиент-серверной архитектуры.

Основная цель — создать фреймворк настолько гибкий, чтобы его можно было использовать и как основу, и как дополнение к уже существующим проектам на Node.js.

Nuxt.js содержит все необходимые конфигурационные заготовки, позволяющие сделать разработку приложений **с серверным рендерингом** на Vue.js лёгкой и приятной.

Кроме того, предоставляется другая опция разработки: `nuxt generate`. С помощью неё можно **статически генерировать** приложения на Vue.js. Эта опция может оказаться следующим большим шагом на пути разработки микросервисных веб-приложений.

Как фреймворк, Nuxt.js привносит множество возможностей, помогающих разработке, таких как: асинхронные данные, middleware, шаблоны и др.



## Возможности

- Написание Vue-файлов
- Автоматическое разделение кода
- Серверный рендеринг
- Мощная система маршрутизации с асинхронными данными
- Обслуживание статических файлов
- Транспиляция ES6/ES7
- Сборка и минимизация JS & CSS
- Управление элементами в блоке head
- Горячая замена модулей при разработке
- Интеграция c ESLint
- Пре-процессоры: SASS, LESS, Stylus, и др.



## Установка

```bash
# Установка пакета
sudo npm install -g create-nuxt-app
```



## Использование

```bash
# Генерация приложения
create-nuxt-app project_name
cd project_name
# Запуск для разработки
npm run dev
# Сборка проекта и генерация HTML файлов для каждого роута
npm run generate
# Сборка проекта для production
npm run build
# Запуск для production
npm run start
```



## Структура папок

- `assets` — Uncompiled assets (like Less / Sass)
- `static` — Unchanging files (like robots.txt)
- `components`
- `layouts` — Application layouts
- `middleware` — Custom functions which run before pages
- `pages` — Application views & routes from which the router is dynamically generated
- `plugins` — JS plugins run before Vue.js init
- `store` — Vuex Store files



## Страницы

Nuxt reads the file tree inside the `pages` directory to create your application’s routes:

- `pages`
	- `index.vue` (loaded when root path `/`)
	- `users`
		- `index.vue` (`/users` path)
		- `_id.vue` (`_` defines a dynamic route with a param `/users/123`)

```javascript
export default {
	asyncData (context) {
		return axios
			.get(`https://my-api/posts/${context.params.id}`)
			.then((res) => {
				return { title: res.data.title }
			})
	},
	fetch (context) {
		return axios
			.get('http://my-api/stars')
			.then((res) => {
				context.store.commit('setStars', res.data)
			})
	},
	// Set the HTML Head tags for the current page. Uses vue-meta
	head () {
		return {
			title: this.title, // Your component's data is available with "this"
			meta: [
				{ hid: 'description', name: 'description',
				content: 'My custom description' }
			]
		}
	},
	// Choose a custom layout for your page
	layout: 'my-custom-layout',
	// If false, Nuxt loads the error page instead
	validate (context) {
		return /^\\d+$/.test(context.params.id) // Must be a number
	},
	// Define a custom transition for current page
	transition: {
		name: 'my-custom-transition',
		mode: 'out-in'
	}
}
```



## Компоненты Nuxt

Use `<nuxt-link>` to navigate between pages in your components.

```jsx
<nuxt-link v-bind:to="'/users' + user.name">
	{{ user.fullName }}'s Profile
</nuxt-link>
```

Use `<nuxt-child/>` to display child component routes in your nested routes.

```jsx
<template>
	<div>
		<h1>I am the parent view</h1>
		<nuxt-child />
	</div>
</template>
```

### Шаблоны (Layouts)

Put application layouts in the `layouts` folder. Use the `nuxt` component to display content.

```jsx
<template>
	<div class="container">
		<nuxt />
	</div>
</template>
```

### Страницы ошибок

Customize the error page with `layouts/error.vue`. Do not include `<nuxt/>` inside its template.

```jsx
<template>
	<h1 v-if="error.statusCode === 404">
		Page not found
	</h1>
	<h1 v-else>An error occurred</h1>
	<nuxt-link to="/">Home page</nuxt-link>
</template>
<script>
	export default {
		props: ['error'],
		// You can set a custom layout for the error page
		layout: 'my-error-layout'
	}
</script>
```



## Псевдонимы для директорий

`~` to reference the source directory.

```jsx
<template>
	<img src="~/assets/your_image.png"/>
</template>
<script>
	import Visits from '~/components/Visits'
	export default {
		components: { Visits }
	}
</script>
```



## Vuex store

Nuxt automatically adds Vuex to your project if you have an `index.js` file in your store folder. This file must export a method which returns a Vuex instance.

You can now use `this.$store` inside of your components.

```jsx
<template>
	<button @click="$store.commit('increment')">
		{{ $store.state.counter }}
	</button>
</template>
```



## nuxt.config.js

```jsx
export default {
	// To add global CSS files
	css: [
		'bulma/css/bulma.css',
		'~/css/main.css'
	],
	// To generate static pages from dynamic routes, specify them here
	generate: {
		routes: function () {
			return [
				'/users/1',
				'/users/2',
				'/users/3'
			];
		}
	},
	// Set a custom loading component
	loading: '~/components/loading.vue',
	// Set HTML Head tags for every page
	head: {
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
		],
		link: [{
			rel: 'stylesheet',
			href: 'https://font.com',
		}]
	},
	// Set the default transition for all pages
	transition: {
		name: 'page’,
		mode: 'out-in'
	},
	plugins: ['~/plugins/vue-notifications']
}
```



## Способы развертывания

### SPA (Single Page Application)

**Benefit:** Organize your project using convention over configuration folder structure and config files. Easy development server.

- Change mode in `nuxt.config.js` to `spa`.
- Run `npm run build`
- Deploy the created `dist/` folder to your static hosting like GitHub Pages for example.

### Static

**Benefit:** All pages get pre-rendered into HTML and have a high SEO and page load score. The content is generated at build time.

- Run `npm run generate`
- Deploy the created `dist/` folder with all the generated HTML files and folders to your static hosting.

### Universal

**Benefit:** Execute your JavaScript on both the client and the server. All routes have high SEO and page load score. Dynamically get routes rendered on the server before being sent to client.

- Upload the contents of your application to your server of choice.
- Run `nuxt build` to build your application.
- Run `nuxt start` to start your application and start accepting requests.



## Полезные ссылки

- [Документация](https://ru.nuxtjs.org/guide/)
- [Официально одобренные пакеты](https://github.com/nuxt-community/awesome-nuxt)
- Курс [Nuxt.js - Vue.js on Steroids](https://freecoursesite.com/nuxt-js-vue-js-on-steroids-1/) ([бесплатно](https://freecoursesite.com/nuxt-js-vue-js-on-steroids-1/))
- [Boilerplate проекта Django + Nuxt.js](https://github.com/Jordanirabor/recipes_app)
- [Nuxt.js Cheat Sheet](https://www.vuemastery.com/nuxt-cheat-sheet/)
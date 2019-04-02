# Bootstrap

- [Описание](#описание)
- [Установка](#установка)
- [Breakpoints](#breakpoints)
- [Цвета](#цвета)
- [Типографика](#типографика)
- [Списки](#списки)
- [Изображения](#изображения)
- [Стартовый шаблон](#стартовый-шаблон)
- [One Column Centered Grid](#one-column-centered-grid)
- [Two Column Grid](#two-column-grid)
- [Three Column Grid](#three-column-grid)
- [Navbar](#navbar)
- [Модальные окна](#модальные-окна)
- [Формы](#формы)
- [Кнопки](#кнопки)
- [Карусель](#карусель)
- [Jumbotron](#jumbotron)
- [Карточки](#карточки)
- [Breadcrumbs](#breadcrumbs)
- [Таблицы](#таблицы)
- [Оформление CSS и медиа запросы](#оформление-css-и-медиа-запросы)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Bootstrap** (также известен как Twitter Bootstrap) — свободный набор инструментов для создания сайтов и веб-приложений. Включает в себя HTML- и CSS-шаблоны оформления для типографики, веб-форм, кнопок, меток, блоков навигации и прочих компонентов веб-интерфейса, включая JavaScript-расширения.




## Установка

### Менеджеры пакетов
```bash
npm install bootstrap
# or
gem install bootstrap -v 4.3.1
```

### CDN

```html
<!-- Только CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<!-- JS, Popper.js и jQuery -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```



## Breakpoints

```
Extra small < 544px
Small ≥ 544px
Medium ≥ 768px
Large ≥ 992px
Extra large ≥ 1200px
```



## Цвета

```css
.text-muted
.text-primary
.text-success
.text-info
.text-warning
.text-danger

.bg-primary
.bg-success
.bg-info
.bg-warning
.bg-danger
.bg-inverse
.bg-faded
```


## Типографика

```css
.text-left       /* Left aligned text */
.text-center     /* Center aligned text */
.text-right      /* Right aligned text */
.text-justify    /* Justified text */
.text-nowrap     /* No wrap text */
.text-lowercause /* Lowercase text */
.text-uppercase  /* Uppercase text */
.text-capitalize /* Capitalized text */
.lead            /* Good for first paragraph of article */
```

### Цитата

```html
<blockquote class="blockquote">
	<p class="mb-0">Lorem ipsum dolor ...</p>
</blockquote>
```

### Заголовки

```html
<h1>h1. Bootstrap heading <small>Secondary text</small></h1>
<p class="h1">Paragraph that looks like heading</p>
```



## Списки

```css
.list-unstyled /* Removes default list margin */
.list-inline   /* Makes list items inline */
.dl-horizontal /* Makes list items two columns */
```



## Изображения

```css
.img-fluid     /* Make an image responsive */
.img-rounded   /* Adds rounded corners to image */
.img-circle    /* Crops image to be circle */
.img-thumbnail /* Adds rounded corner + border */
```



## Стартовый шаблон

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
		<!-- Main CSS -->
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		<div class="container">
			<h1>Hello, world!</h1>
			<div class="row">
				<div class="col-sm-6">Left Column</div>
				<div class="col-sm-6">Right Column</div>
			</div>
		</div>
		<!-- jQuery first, then Tether, then Bootstrap JS. -->
		<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
		<!-- Main JS -->
		<script src="js/main.js"></script>
	</body>
</html>
```



## One Column Centered Grid

```html
<div class="container">
	<div class="row justify-content-center">
		<div class="col-md-6"></div>
	</div>
</div>
```



## Two Column Grid

```html
<div class="container">
	<div class="row">
		<div class="col-sm-6"></div>
		<div class="col-sm-6"></div>
	</div>
</div>
```



## Three Column Grid

```html
<div class="container">
	<div class="row">
		<div class="col-sm-4"></div>
		<div class="col-sm-4"></div>
		<div class="col-sm-4"></div>
	</div>
</div>
```



## Navbar

```html
<nav class="navbar navbar-toggleable-md bg-faded navbar-inverse bg-primary">
	<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<a class="navbar-brand" href="#">Navbar</a>
	<div class="collapse navbar-collapse" id="navbarNavDropdown">
		<ul class="navbar-nav">
			<li class="nav-item active">
				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Features</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Pricing</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" ariaexpanded="false">
					Dropdown link
				</a>
				<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					<a class="dropdown-item" href="#">Action</a>
					<a class="dropdown-item" href="#">Another action</a>
					<a class="dropdown-item" href="#">Something else here</a>
				</div>
			</li>
		</ul>
	</div>
</nav>
```



## Модальные окна

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
	Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" arialabelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<h2>Modal body heading</h2>
				<p>Modal body text description</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>
```



## Формы

```html
<form>
	<div class="form-group">
		<label for="exampleInputEmail1">Email address</label>
		<input type="email" class="form-control" id="exampleInputEmail1" ariadescribedby="emailHelp" placeholder="Enter email">
		<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Password</label>
		<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
	</div>
	<div class="checkbox">
		<label>
			<input type="checkbox"> Check me out
		</label>
	</div>
	<button type="submit" class="btn btn-primary">Submit</button>
</form>
```



## Кнопки

```css
.btn         /* Needs to be added to all buttons because it adds padding and margin */
.btn-default /* The default button style */
.btn-primary /* The button that has the primary action in a group */
.btn-success /* Could be used on the last submit button in a form */
.btn-info    /* Informational button */
.btn-link    /* Removes background color and add text color */
.btn-lg      /* Large buttom */
.btn-sm      /* Smaller than default button */
.btn-xs      /* Even smaller */
.btn-block   /* Button that spans full width of parent */
```



## Карусель

```html
<div id="carousel-name" class="carousel slide" data-ride="carousel">
	<ol class="carousel-indicators">
		<li data-target="#carousel-name" data-slide-to="0" class="active"></li>
		<li data-target="#carousel-name" data-slide-to="1"></li>
		<li data-target="#carousel-name" data-slide-to="2"></li>
	</ol>
	<div class="carousel-inner" role="listbox">
		<div class="carousel-item active">
			<img class="d-block img-fluid" src="https://dummyimage.com/900x340/563d7c/fff&text=+" alt="First slide">
			<div class="carousel-caption d-none d-md-block">
				<h3>Carousel Slider Title</h3>
				<p>Description text to further describe the content of the slide image</p>
				<a href="" class="btn btn-primary">Call to Action</a>
			</div>
		</div>
		<div class="carousel-item">
			<img class="d-block img-fluid" src="https://dummyimage.com/900x340/563d7c/fff&text=+" alt="Third slide">
			<div class="carousel-caption d-none d-md-block">
				<a href="" class="btn btn-primary">Call to Action</a>
			</div>
		</div>
	</div>
	<a class="carousel-control-prev" href="#carousel-name" role="button" data-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="sr-only">Previous</span>
	</a>
	<a class="carousel-control-next" href="#carousel-name" role="button" data-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="sr-only">Next</span>
	</a>
</div>
```



## Jumbotron

```html
<div class="jumbotron jumbotron-fluid">
	<div class="container">
		<h1 class="display-3">Fluid jumbotron</h1>
		<p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
	</div>
</div>
```



## Карточки

```html
<div class="card" style="width: 20rem;">
	<img class="card-img-top w-100" src="https://dummyimage.com/600x400/563d7c/fff" alt="Card image cap" >
	<div class="card-block">
		<h4 class="card-title">Card title</h4>
		<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		<a href="#" class="btn btn-primary">Go somewhere</a>
	</div>
</div>
```



## Breadcrumbs

```html
<ol class="breadcrumb">
	<li><a href="#">Home</a></li>
	<li><a href="#">Library</a></li>
	<li class="active">Data</li>
</ol>
```



## Таблицы

```html
<table class="table">
	<thead class="thead-default">
		<tr>
			<th>#</th>
			<th>thead-default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">1</th>
			<td>Nina</td>
		</tr>
	</tbody>
</table>

<table class="table">
	<thead class="thead-inverse">
		<tr>
			<th>#</th>
			<th>thead-inverse</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">1</th>
			<td>Nina</td>
		</tr>
	</tbody>
</table>
```



## Оформление CSS и медиа запросы

```css
/*
 * Component section heading
 *
 * Component description and use
 */

/* base - shared styles */
.component { width: 220px; }
/* Sub-component with component name as a prefix to isolate styles and break the cascade. */
.component-heading {
	display: block;
	width: 100px;
	font-size: 1rem;
}
/* variant - alert color */
.component-alert {
	color: #ff0000;
}
/* variant - success color */
.component-success {
	color: #00ff00;
}
/* Add media queries below components instead of a separate stylesheet or section to make updating easier */
@media (min-width: 480px) {
	.component-heading { width:auto; }
}
```



## Полезные ссылки

- [Документация](https://bootstrap-4.ru/)
# Vim

- [Описание](#описание)
- [Выход, сохранение, редактирование](#выход-сохранение-редактирование)
- [Общее использование](#общее-использование)
- [Окна, вкладки и т.д.](#окна-вкладки-и-тд)
- [Работа со вкладками](#работа-со-вкладками)
- [Настройки для .vimrc](#настройки-для-vimrc)
- [Вопросы и ответы](#вопросы-и-ответы)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Vim** (**Vi** **I**mproved) — свободный текстовый редактор, созданный на основе более старого vi. Ныне это один из мощнейших текстовых редакторов с полной свободой настройки и автоматизации, возможными благодаря расширениям и надстройкам.

Для комфортной работы в Vim нужно потратить некоторое время на запоминание основных команд, при этом желательно уметь печатать «вслепую». Все операции с текстом в Vim можно выполнять, не отрывая рук от клавиатуры, то есть, мышь и дополнительная клавиатура со стрелками просто не нужны, более того, тянуться к ним неудобно, если вы освоили «слепой метод».

В Vim существует несколько режимов работы:
- **Обычный**. В этом режиме можно перемещаться по тексту и выполнять базовые операции редактирования, такие как удаление или вставка текста. В режиме команд каждая текстовая клавиша выполняет некоторую функцию. Например, при нажатии 1 p вставляется текст из буфера обмена (это аналог сочетания клавиш <kbd>CTRL</kbd>+<kbd>V</kbd>), а при нажатии <kbd>x</kbd> стирается символ под курсором. Для перехода в обычный режим из любого другого режима нужно нажать клавишу <kbd>ESC</kbd>. Следите за тем, чтобы в была установлена латинская раскладка клавиатуры и выключен <kbd>CAPS-LOCK</kbd>.
- **Режим ввода**. В режиме ввода Vim работает как обычный текстовый редактор, в котором вводится текст. Для перехода в режим вставки используются клавиши:
	- <kbd>i</kbd> — начать ввод перед символом, на котором находится курсор
	- <kbd>I</kbd> — начать ввод перед первым символом в строке
	- <kbd>a</kbd> — начать ввода после символа, на котором находится курсор
	- <kbd>A</kbd> — начать ввода после последнего символа в строке
	- <kbd>o</kbd> — добавить пустую строку ниже данной строки и начать ввод
	- <kbd>O</kbd> — добавить пустую строку выше данной строки и начать ввод
- **Режим команд**. Все команды начинаются с двоеточия. Например, команда `:e file.txt` открывает файл file.txt, а команда `:w` сохраняет текущий файл.



## Выход, сохранение, редактирование

| Команда | Описание |
| --- | --- |
| :q | выход из файла |
| :w | сохранить файл/записать содержимое |
| :e | обновить содержимое файла |
| ! | выполнить команду в любом случае |
| :wq | команды можно совмещать(в данном примере файл будет сохранен и закрыт) |
| :x | аналог :wq |
| ZZ | аналог :wq |
| :q! | команды можно совмещать(выйти в любом случае, например, после сделанных изменений, без их сохранения) |



## Общее использование

| Команда | Описание |
| --- | --- |
| i | режим вставки/ввода |
| a | режим вставки/ввода |
| ESC (Ctrl+[) | обычный режим |
| hjkl | перемещение в разные стороны |
| o | добавить строку сразу за текущей |
| O | добавить строку перед текущей |
| u | отмена последней команды |
| Ctrl+r | отмена отмены последней команды(redo)/повтор последней команды |
| gg | перейти в начало документа |
| Shift+g | перейти в конец документа |
| Shift+a | перейти в конец строки и перейти в режим редактирования |
| Shift+v | перейти в визуальный режим |
| dd | удалить текущую строку (вырезать) |
| yy | копировать строку |
| p | вставить из буфера обмена |
| / | начать вводить поисковую фразу |
| n | следующий результат поиска |
| Shift+n | предыдущий результат поиска |
| ^ | переход в начало строки |
| $ | переход в конец строки |
| Ctrl+b | перемещение на один экран назад |
| Ctrl+f | перемещение на один экран вперед |
| mа | создания закладки с именем 'a' |
| 'a | переход к созданной закладке 'a' |

## Окна, вкладки и т.д.

| Команда | Описание |
| --- | --- |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>s</kbd> | горизонтальное разделение окна |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>v</kbd> | вертикальное разделение окна |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd><клавиша перемещения></kbd> | перемещение к окну |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>K</kbd> | текущее окно сделать верхним |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>_</kbd> | текущее окно сделать макс размер |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>=</kbd> | выровнять все окна |

## Работа со вкладками

| Команда | Описание |
| --- | --- |
| :tabnew [filename] | открыть новую вкладку |
| :tabf pattern | открыть вкладку по шаблону |
| :tabs | список открытых вкладок |
| gt или :tabn | следующая вкладка |
| g Shift+t или :tabp | предыдущая вкладка |
| :tabfirst или :tabfir | первая вкладка |
| :tablast | последняя вкладка |
| :tabm n | переместить вкладку в n (от 0) |
| :tabdo command | выполнить над всеми вкладками |



## Настройки для .vimrc

### Использовать 4 пробела вместо табов

Добавьте в файл `~/.vimrc`:
```
set tabstop=4
" when indenting with '>', use 4 spaces width
set shiftwidth=4
" On pressing tab, insert 4 spaces
set expandtab
```

### Использовать стрелки для перемещения

Добавьте в файл `~/.vimrc`:
```
:set nocompatible
```



## Вопросы и ответы

### Открытие и сохранение файла
- **Как создать новый файл?** Если Vim настроен в системе, то файл можно создать, например, щелкнув в проводнике правой кнопкой мыши и, выбрав «Новый файл», а затем открыть созданный файл Vim. Можно создать файл прямо из Vim с помощью команды `:e c:\prj\myfile.txt` В некоторых случаях удобно сначала перейти в папку, где будет создан файл `:cd`, а потом его открыть `:e :cd c:\prj :e myfile.cpp`
- **Как открыть файл?** С помощью команды `:e myfile.cpp`
- **Как сохранить файл?** С помощью команды `:w`. Чтобы сохранить под другим именем, то `:w новое имя`
- **Как выйти из Vim?** Командой `:q`. Чтобы сохранить текущий файл и выйти `:wq`. Выйти без сохранения `:q!`

### Перемещение и поиск в тексте
- **Как перемещаться по тексту?** Используйте следующие клавиши и их комбинации:
	- <kbd>h</kbd> — переместиться на один символ влево
	- <kbd>j</kbd> — переместиться на один символ вниз
	- <kbd>k</kbd> — переместиться на один символ вверх
	- <kbd>l</kbd> — переместиться на один символ вправо
	- <kbd>CTRL</kbd> + <kbd>f</kbd> — переместиться на страницу вниз
	- <kbd>CTRL</kbd> + <kbd>b</kbd> — переместиться на страницу вверх
	- <kbd>w</kbd> — переместиться на начало следующего слова.
	- <kbd>b</kbd> — переместиться на начало предыдущего слова
- **Как перейти на строку 42?** С помощью команды `:42`
- **Как найти в тексте некоторое слово?** Допустим, это слово «яблоко». Тогда так: `/яблоко`
- **Как найти и заменить одно слово на другое?** Заменим все слова «яблоко» на слово «груша» `:%s/яблоко/груша/g`

### Копирование и удаление и изменение текста
- **Как скопировать строку?** Установите курсор на строку, которую хотите скопировать и нажмите `yy`. Перейдите туда, куда вы хотите вставить строку и нажмите `p` чтобы вставить строку ниже курсора или `P` — чтобы вставить выше
- **Как скопировать несколько строк?** Перейдите на первую копируемую строку и нажмите `my`. Перейдите на последнюю копируемую строку и нажмите `y’y`. Затем перейдите туда, куда хотите вставить строки и нажмите `p` или `P`
- **Как перенести одну строку в другое место?** Так же как и скопировать, но вместо `yy` нажмите `dd`
- **Как перенести несколько строк в другое место?** Так же как и скопировать, но вместо `my` нажмите `md`, а вместо `y’y` нажмите `d’d`.
- **Как скопировать часть текста?** Нажмите `v` и выделите текст. Чтобы запомнить выделение нажмите `y`. Перейдите туда, куда нужно вставить текст и нажмите `p` или `P`
- **Как стереть символ?** Находясь в режиме ввода, удалить только что написанные символы, можно клавишей `backspace`. В режиме команд используйте клавишу `x` чтобы удалить символ под курсором, и `X` чтобы удалить символ слева от курсора
- **Как стереть строку?** С помощью сочетания клавиш `dd`
- **Как объединить две строки?** Чтобы приклеить к данной строке следующую, нажмите `J`
- **Как отменить последние правки?** Нажмите `u`
- **Как вернуть последние правки?** Нажмите `CTRL + R`

### Разные вопросы
- **Как включить проверку орфографии?** Включить: `:set spell spelllang=ru` Выключить: `:set nospell`


## Полезные ссылки

- [Оригинал статьи](https://github.com/mireadev/vim-cheat-sheet/blob/master/README.md)
- [Шпаргалка по Vim](https://github.com/hant0508/lessons/blob/master/%D0%A3%D1%87%D0%B5%D0%B1%D0%BD%D0%B8%D0%BA%D0%B8/vimtips.pdf)
- [Vim awesome](http://vimawesome.com/)
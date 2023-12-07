1. Add - @import 'twins-vue/tw-styles.css' in your main.scss file
2. Add - import twins from 'twins-vue' in your main.js file
3. Add - app.use(twins)

At the moment lib in first steps of development.

- TwTableBase component

  ***PROPS***
  
|Входной параметр (props) | Обязательный | Тип значения параметра | Описание |
|----------|----------|----------|---------|
| Основные параметры: |
|body      | Да       |Массив объектов или массив массивов | Массив данных который отрисовывает таблица. Тип принимаемых данных - массив объектов, или массив массивов.|
|header    | Нет      |Массив      | Массив данных или объект, который должен содержать названия колонок. Обычно массив строк, или объект с примитивными значениями (string или number).|
| Позиционирование в ячейке: |
|td_align_left    | Нет      |Boolean      | Флаг true или false, добавляющий позиционирование содержимого ячеек таблицы по левому краю.|
|td_align_right    | Нет      |Boolean      | Флаг true или false, добавляющий позиционирование содержимого ячеек таблицы по правому  краю.|
|cell_padding    | Нет      |String      | Значение padding в ячейках таблицы. Формат '2px' или '2px 4px'|
|elements_with_tabulation    | Нет      |Массив массивов      | Позволяет добавлять отступы слева в произвольные ячейки таблицы. Формат - массив массивов. В каждом внутреннем массиве элемент с нулевым индексом - это номер строки, а первым индексом - номер столбца. Таким образом вычисляется ячейка, в которой нужно сделать отступ.|
| Дополнительные возможности: |
|red_when_sub_zero    | Нет      |Boolean      | Флаг true или false активирующий опцию маркировки красным отрицательных значений в таблице.|
|table_with_select    | Нет      |Boolean      | Флаг true или false активирующий опцию выделения строки при нажатии на неё. Для корректной работы в таблице не должно быть полностью идентичных строк.|
|with_fixed    | Нет      |Number      | Числовое значение округления параметров в ячейках таблицы.|
| Размеры и цветовая гамма: |
|width    | Нет      |String      | Ширина таблицы. Строка, формата '100px' или '300rem'. Допустимы любые единицы измерения.|
|height    | Нет      |String      | Высота таблицы. Строка, формата '100px' или '300rem'. Допустимы любые единицы измерения.|
|cell_min_width    | Нет      |String      | Минимальная ширина ячейки таблицы.|
|table_bgc    | Нет      |String      | Цвет заливки таблицы.|
|header_bgc    | Нет      |String      | Цвет заливки header таблицы.|
|header_font_color    | Нет      |String      | Цвет текста в header таблицы.|
|header_font_size    | Нет      |String      | Размер текста в header таблицы.|
|cell_font_size    | Нет      |String      | Размер текста в ячейках таблицы.|
|cell_font_color    | Нет      |String      | Цвет текста в ячейках таблицы.|
|multicolor    | Нет      |Boolean      | Двойная заливка для таблицы. Четные строки имеют другой оттенок, чем нечетные|
|row_custom_settings    | Нет      |Array<{idx: Number, textColor: String, fontSize: String, fontFamily: String}>      |Массив объектов формата {idx: Number, textColor: String, fontSize: String, fontFamily: String, bgc: String}, позволяющий поменять стили конкретной строки в таблице. idx - номер строки, textColor - цвет текста в строке, fontSize - размер текста в строке, fontFamily - название шрифта в строке, bgc - цвет заливки этой строки.|
|multicolor    | Нет      |Boolean      | Двойная заливка для таблицы. Четные строки имеют другой оттенок, чем нечетные|
|header_padding    | Нет      |String      | Паддинг в строке хидера|
|table_border    | Нет      |String      | Border всей таблицы|


   ***Emits***
|Название | Аргументы | Описание |
|----------|----------|----------|
|@push     | {bodyElement, $event}    |Клик по строке таблицы левой кнопкой мыши |
|@dab-click |{bodyElement, $event}    |Двойной клик по строке таблицы левой кнопкой мыши |
|@right-click | {bodyElement, $event} |Клик по строке таблицы правой кнопкой мыши |

******************************************************************************************************************************************************************************

- TwButton component

TwButton have one slot. You can provide there a custom icon or some picture/

|Входной параметр (props) | Обязательный | Тип значения параметра | Описание |
|----------|----------|----------|---------|
|success    | Нет      | boolean      | Success type button, green |
|error    | Нет      | boolean      | Error type button, crimson |
|warn    | Нет      | boolean      | Warning type button, orange |
|color_gamma    | Нет      | String  | Color schema for button based on color ('violet' or '#886e6e', etc) |
|outline    | Нет      | boolean  | Button without backGround color |
|rounded    | Нет      | boolean  | Button with rounded borders (12px) |
|round    | Нет      | boolean  | Round button, 50% border-radius |
|disabled    | Нет      | boolean  | Button, without events, color - #6d6d6d(typeof gray) |
|width    | Нет      | String  | Button width. Format - '100px' or '10rem', etc |
|height    | Нет      | String  | Button height. Format - '100px' or '10rem', etc |
|bgc    | Нет      | String  | Background color |
|bgcHover    | Нет      | String  | Custom color of background hover |
|textColor    | Нет      | String  | Custom text or primeicons color inside button |
|border    | Нет      | String  | Border attribute for button. Format '1px solid black' |
|prime_icon    | Нет      | String  | If you use PrimeIcons in your project, you can specify type of icon. Format 'pi-check' |

   ***Emits***

|Название | Аргументы | Описание |
|----------|----------|----------|
|@push     |  -   |Клик по строке таблицы левой кнопкой мыши |

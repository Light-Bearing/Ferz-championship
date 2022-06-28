package com.listenvision;


import java.io.File;

public class led {

/**
 * Светодиодный SDK 6.0
 *
 * HuWei
 *
 *
 * (C) Авторские права 2010-2015, LISTEN VISION
 * Все права защищены
 *
 */


    /**
     * CreateProgram создает программный объект и успешно возвращает дескриптор программного объекта.
     * <p>
     * Параметр Описание
     * LedWidth ширина экрана
     * LedHeight высота экрана
     * ColorType Цвет экрана: 1. Монохромный 2. Два основных цвета 3. Цветной 4. Полноцветный
     * возвращаемое значение
     * 0 Не удалось создать программный объект
     * Не 0 успешно создан программный объект
     */
    public native static int CreateProgram(int LedWidth, int LedHeight, int ColorType);


    /**
     * AddProgram для добавления программы
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     * Программа Нет номера программы
     * Продолжительность программного воспроизведения ProgramTime 0.
     * Продолжительность программного воспроизведения не равна 0. Укажите продолжительность воспроизведения.
     * Время воспроизведения цикла LoopCount
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AddProgram(int hProgram, int ProgramNo, int ProgramTime, int LoopCount);

    /**
     * LV_AddImageTextArea добавить графическую область
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     * Программа Нет номера программы
     * AreaNo номер области
     * l По оси абсцисс левого верхнего угла области
     * t Ордината верхнего левого угла области
     * ширина области w
     * h высота области
     * IsBackgroundArea - это область фона, 0. Область переднего плана (по умолчанию) 1. Область фона. У Т4 нет области фона
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AddImageTextArea(int hProgram, int ProgramNo, int AreaNo, int l, int t, int w, int h, int IsForegroundArea);

    /**
     * AddFileToImageTextArea для добавления файла в графическую область
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     * Программа Нет номера программы
     * AreaNo номер области
     * Путь к файлу FilePath, поддерживаемые типы файлов: txt rtf bmp gif png jpg jpeg tiff
     * Входной трюк InStyle
     * nSpeed ​​скорость трюка
     * Время задержки DelayTime
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AddFileToImageTextArea(int hProgram, int ProgramNo, int AreaNo, String FilePath, int InStyle, int nSpeed, int DelayTime);

    /**
     * AddMultiLineTextToImageTextArea для добавления многострочного текста в графическую область
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     * Программа Нет номера программы
     * AreaNo номер области
     * Тип, добавленный AddType 0. - это строка 1. File (поддерживаются только файлы txt и rtf)
     * AddStr AddType - 0 для строковых данных, а AddType - 1 для пути к файлу.
     * FontName название шрифта
     * Размер шрифта FontSize
     * Цвет шрифта FontColor 0xff красный 0xff00 зеленый 0xffff желтый
     * Полужирный ли шрифт FontBold 0 не полужирный 1 полужирный
     * FontItalic курсив 0 не наклонный 1 наклонный
     * FontUnderline следует ли подчеркивать 0 без подчеркивания 1 плюс подчеркивание
     * Входной трюк InStyle 1~38
     * nSpeed скорость трюка 1 самый быстрый - 32 самый медленный
     * Время задержки DelayTime
     * nAlignment левое и правое выравнивание по центру
     * IsVCenter центрирован по вертикали
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AddMultiLineTextToImageTextArea(int hProgram, int ProgramNo, int AreaNo, int AddType, String AddStr, String FontName, int FontSize, int FontColor, int FontBold, int FontItalic, int FontUnderline, int InStyle, int nSpeed, int DelayTime, int nAlignment, int IsVCenter);

    /**
     * AddStaticTextToImageTextArea добавляет статический текст в графическую область
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     * Программа Нет номера программы
     * AreaNo номер области
     * Тип, добавленный AddType 0. - это строка 1. File (поддерживаются только файлы txt и rtf)
     * AddStr AddType - 0 для строковых данных, а AddType - 1 для пути к файлу.
     * FontName название шрифта
     * Размер шрифта FontSize
     * Цвет шрифта FontColor 0xff красный 0xff00 зеленый 0xffff желтый
     * Полужирный ли шрифт FontBold 0 не полужирный 1 полужирный
     * FontItalic курсив 0 не наклонный 1 наклонный
     * FontUnderline следует ли подчеркивать 0 без подчеркивания 1 плюс подчеркивание
     * Время задержки DelayTime
     * nAlignment левое и правое выравнивание по центру
     * IsVCenter центрирован по вертикали
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AddStaticTextToImageTextArea(int hProgram, int ProgramNo, int AreaNo, int AddType, String AddStr, String FontName, int FontSize, int FontColor, int FontBold, int FontItalic, int FontUnderline, int DelayTime, int nAlignment, int IsVCenter);

    /**
     * AddSinglelineTextToImageTextArea для добавления многострочного текста в графическую область
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     * Программа Нет номера программы
     * AreaNo номер области
     * Тип, добавленный AddType 0. - это строка 1. File (поддерживаются только файлы txt и rtf)
     * AddStr AddType - 0 для строковых данных, а AddType - 1 для пути к файлу.
     * FontName название шрифта
     * Размер шрифта FontSize
     * Цвет шрифта FontColor 0xff красный 0xff00 зеленый 0xffff желтый
     * Полужирный ли шрифт FontBold 0 не полужирный 1 полужирный
     * FontItalic курсив 0 не наклонный 1 наклонный
     * FontUnderline следует ли подчеркивать 0 без подчеркивания 1 плюс подчеркивание
     * Входной трюк InStyle
     * nSpeed ​​скорость трюка
     * Время задержки DelayTime
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AddSinglelineTextToImageTextArea(int hProgram, int ProgramNo, int AreaNo, int AddType, String AddStr, String FontName, int FontSize, int FontColor, int FontBold, int FontItalic, int FontUnderline, int InStyle, int nSpeed, int DelayTime);

    /**
     * AddSinglelineTextToImageTextArea для добавления многострочного текста в графическую область
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     * Программа Нет номера программы
     * AreaNo номер области
     * l По оси абсцисс левого верхнего угла области
     * t Ордината верхнего левого угла области
     * ширина области w
     * h высота области
     * FontName название шрифта
     * Размер шрифта FontSize
     * Цвет шрифта FontColor 0xff красный 0xff00 зеленый 0xffff желтый
     * Полужирный ли шрифт FontBold 0 не полужирный 1 полужирный
     * FontItalic курсив 0 не наклонный 1 наклонный
     * FontUnderline следует ли подчеркивать 0 без подчеркивания 1 плюс подчеркивание
     * IsYear, отображать ли год 1 для отображения 0, чтобы не отображать то же самое ниже
     * IsWeek, отображать ли неделю
     * IsMonth, отображать ли месяц
     * IsDay, отображать ли день
     * IsHour, отображать ли время
     * IsMinute, отображать ли минуты
     * IsSecond, отображать ли секунды
     * DateFormat формат даты 0. ГГГГ год ММ месяц ДД день 1. ГГ год ММ месяц ДД день 2. ММ / ДД / ГГГГ 3. ГГГГ / ММ / ДД 4. ГГГГ-ММ-ДД 5. ГГГГ.ММ.ДД 6. ММ.ДД.ГГГГ 7.ДД.ММ.ГГГГ
     * DateColor Цвет шрифта даты 0xff красный 0xff00 зеленый 0xffff желтый
     * WeekFormat Формат недели 0. Неделя X 1. Понедельник 2. Понедельник.
     * WeekColor цвет шрифта недели 0xff красный 0xff00 зеленый 0xffff желтый
     * Формат времени TimeFormat 0.ЧЧ час мм минута сс секунда 1. ЧЧ час мм минута сс секунда 2. ЧЧ: мм: сс 3. АМ ЧЧ: мм: сс 4. АМ ЧЧ: мм: сс 5. ЧЧ: мм: сс 6.ЧЧ: мм: сс AM
     * TimeColor цвет шрифта времени 0xff красный 0xff00 зеленый 0xffff желтый
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AddDigitalClockArea(int hProgram, int ProgramNo, int AreaNo, int l, int t, int w, int h, String FontName, int FontSize, int FontColor, int FontBold, int FontItalic, int FontUnderline, int IsYear, int IsWeek, int IsMonth, int IsDay, int IsHour, int IsMinute, int IsSecond, int DateFormat, int DateColor, int WeekFormat, int WeekColor, int TimeFormat, int TimeColor);

    /**
     * DeleteProgram уничтожает программный объект (примечание: если программный объект больше не используется, вызовите эту функцию, чтобы уничтожить его, иначе это вызовет утечку памяти)
     * <p>
     * Параметр Описание
     * Дескриптор объекта программы hProgram
     */
    public native static void DeleteProgram(int hProgram);

    /**
     * NetWorkSend отправляет программы, эта отправка является индивидуальной отправкой
     * <p>
     * Параметр Описание
     * IpStr LED экран IP
     * Дескриптор объекта программы hProgram
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int NetWorkSend(String IpStr, int hProgram);

    /**
     * SetBasicInfo устанавливает основные параметры экрана
     * <p>
     * Параметр Описание
     * IP-экран IPStr LED
     * Цвет экрана ColorType 1. Монохромный 2. Два основных цвета 3. Цветной 4. Полноцветный
     * Ширина экрана LedWidth в пунктах
     * Высота экрана LedHeight в точках
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int SetBasicInfo(String IpStr, int ColorType, int LedWidth, int LedHeight);

    /**
     * SetOEDA комплект OE DA
     * <p>
     * Параметр Описание
     * IpStr LED экран IP
     * OE OE 0. Низкая эффективность 1. Высокая эффективность
     * Da DA 0. Отрицательная полярность 1. Положительная полярность
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int SetOEDA(String IpStr, int Oe, int Da);

    /**
     * AdjustTime - автонастройка времени
     * <p>
     * Параметр Описание
     * IP-экран IPStr LED
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int AdjustTime(String IpStr);

    /**
     * Экран переключателя PowerOnOff
     * <p>
     * Параметр Описание
     * IP-экран IPStr LED
     * Значение переключателя OnOff
     * Отключение экрана 1
     * Включите экран 0
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int PowerOnOff(String IpStr, int OnOff);

    /**
     * Экран переключателя времени TimePowerOnOff
     * <p>
     * Параметр Описание
     * IP-экран IPStr LED
     * StartHour
     * StartMinute минута начала
     * EndHour Конечный час
     * EndMinute конечные минуты
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int TimePowerOnOff(String IpStr, int StartHour, int StartMinute, int EndHour, int EndMinute);

    /**
     * SetBrightness установить яркость
     * <p>
     * Параметр Описание
     * IP-экран IPStr LED
     * Значение яркости 0 ~ 15
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int SetBrightness(String IpStr, int BrightnessValue);

    /**
     * Светодиодный тест LedTest
     * <p>
     * Параметр Описание
     * IP-экран IPStr LED
     * Тестовое значение TestValue [1..5]
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int LedTest(String IpStr, int TestValue);

    /**
     * SetLedCommunicationParameter устанавливает сетевую информацию светодиодного экрана
     * <p>
     * Параметр Описание
     * IP-экран IPStr LED
     * Новый IP-адрес светодиодного экрана NewIp
     * Новая маска подсети светодиодного экрана NewNetMask
     * Новый шлюз светодиодного экрана NewGateway
     * Новый MAC-адрес светодиодного экрана NewMac
     * возвращаемое значение
     * 0 успехов
     * Ненулевой отказ
     */
    public native static int SetLedCommunicationParameter(String IpStr, String NewIp, String NewNetMask, String NewGateway, String NewMac);


    static {
        if (new File("lv_led.dll").exists()) {
            System.loadLibrary("lv_led");
        } else
            System.out.println("file not found");
    }
}
package com.thomson.spring.websocket.util.jackson;

/**
 * Created on 8/3/2016.
 */
public class JSR310OffsetDateTimeConverters {
    private JSR310OffsetDateTimeConverters() {
    }
/*
    public static class LocalDateToDateConverter implements Converter<LocalDate, Date> {
        public static final LocalDateToDateConverter INSTANCE = new LocalDateToDateConverter();
        private LocalDateToDateConverter() {}
        @Override
        public Date convert(LocalDate source) {
            return source == null ? null : Date.from(source.atStartOfDay(ZoneId.systemDefault()).toInstant());
        }
    }
    public static class DateToLocalDateConverter implements Converter<Date, LocalDate> {
        public static final DateToLocalDateConverter INSTANCE = new DateToLocalDateConverter();
        private DateToLocalDateConverter() {}
        @Override
        public LocalDate convert(Date source) {
            return source == null ? null : ZonedDateTime.ofInstant(source.toInstant(), ZoneId.systemDefault()).toLocalDate();
        }
    }*/
}

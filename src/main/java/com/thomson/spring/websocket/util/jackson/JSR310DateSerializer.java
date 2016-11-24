package com.thomson.spring.websocket.util.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;

/**
 * Created on 8/3/2016.
 */

public class JSR310DateSerializer extends JsonSerializer<TemporalAccessor> {

  /*  private static final DateTimeFormatter ISOFormatter =
            DateTimeFormatter.ISO_OFFSET_DATE_TIME.withZone(ZoneId.of("Z"));*/

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");

    public static final JSR310DateSerializer INSTANCE = new JSR310DateSerializer();

    private JSR310DateSerializer() {}

    @Override
    public void serialize(TemporalAccessor value, JsonGenerator generator, SerializerProvider serializerProvider) throws IOException {
        generator.writeString(formatter.format(value));
    }
}

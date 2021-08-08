package lb.ferzshow.security;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import lb.ferzshow.config.WebSecurityConfig;

import java.io.IOException;

public class JsonDeserializers {
    public static class PasswordDeserializer extends JsonDeserializer<String> {
        public String deserialize(JsonParser parser, DeserializationContext deserializationContext) throws IOException {
            ObjectCodec oc = parser.getCodec();
            JsonNode node = oc.readTree(parser);
            String rawPassword = node.asText();
            return WebSecurityConfig.PASSWORD_ENCODER.encode(rawPassword);
        }
    }
}

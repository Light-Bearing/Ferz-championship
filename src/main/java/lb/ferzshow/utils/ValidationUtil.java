package lb.ferzshow.utils;

import lb.ferzshow.error.IllegalRequestDataException;
import lb.ferzshow.entity.BaseEntity;

public class ValidationUtil {
    public static void checkNew(BaseEntity entity) {
        if (!entity.isNew()) {
            throw new IllegalRequestDataException(entity.getClass().getSimpleName() + " must be new (id = null");
        }
    }

    public static void assureIdConsistent(BaseEntity entity, long id) {
        if (entity.isNew()) {
            entity.setId(id);
        } else if (entity.id() != id) {
            throw new IllegalRequestDataException(entity.getClass().getSimpleName() + " must has id=" + id);
        }
    }
}

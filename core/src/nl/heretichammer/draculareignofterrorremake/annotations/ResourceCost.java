package nl.heretichammer.draculareignofterrorremake.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import nl.heretichammer.draculareignofterrorremake.models.Resource;

@Retention(RetentionPolicy.RUNTIME)
public @interface ResourceCost {
	public Resource resource();
	public int amount();
}

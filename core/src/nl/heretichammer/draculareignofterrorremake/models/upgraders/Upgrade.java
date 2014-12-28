package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import nl.heretichammer.draculareignofterrorremake.models.ResourceCost;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Upgrade {
	int level();
	ResourceCost cost();
	String image();
}

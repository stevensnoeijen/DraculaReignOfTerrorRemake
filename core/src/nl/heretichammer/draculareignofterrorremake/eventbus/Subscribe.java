package nl.heretichammer.draculareignofterrorremake.eventbus;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Subscribes to subject-event, which must be set as first parameter of the method. 
 * The filter is optional for to filter events only of a certain property. 
 * @author Steven Snoeijen
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Subscribe {
	/**
	 * Filter to only receive of a certain (1 or multiple) property, if not set it will receive all.
	 * @return regex of property/properties
	 */
	public String filter() default "";
}

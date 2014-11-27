package nl.heretichammer.draculareignofterrorremake.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.lang.model.type.NullType;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Uniter {
	public String name();
	public Class<?> particle() default NullType.class;
	public boolean physical() default true;
	public ResourceCost[] cost();
	public UnitAttribute[] attributes();
}

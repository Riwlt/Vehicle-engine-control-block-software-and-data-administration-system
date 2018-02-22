package lt.riw.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter{

	@Override
	public void addViewControllers(ViewControllerRegistry registry){
		registry.addViewController("/api/login").setViewName("login");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        registry.addViewController("/api/").setViewName("index");
        registry.addViewController("/api/vehicleform").setViewName("vehicleform");
	}
	
}

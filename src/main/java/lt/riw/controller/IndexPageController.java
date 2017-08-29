package lt.riw.controller;



import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import lt.riw.vehicle.VehicleForm;


@Controller
public class IndexPageController extends WebMvcConfigurerAdapter{
	

	@RequestMapping(value = "/vehicleform")
	ModelAndView index( ModelAndView modelAndView, Model model) {
		modelAndView.setViewName("vehicleform");
		return modelAndView;
	}
	
	  @Override
	    public void addViewControllers(ViewControllerRegistry registry) {
	        registry.addViewController("/results").setViewName("results");
	    }
	 
	  @GetMapping("/vehicleform")
	    public String showForm(VehicleForm vehicleForm) {
	        return "vehicleform";
	    }

	    @PostMapping("/vehicleform")
	    public String checkCustomerInfo(@Valid VehicleForm vehicleForm, BindingResult bindingResult) {
	        if (bindingResult.hasErrors()) {
	            return "vehicleform";
	        }
	        return "redirect:/vehicleform";
	    }

}

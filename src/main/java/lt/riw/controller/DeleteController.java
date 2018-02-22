package lt.riw.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteController {
	
	@RequestMapping(value = "/api/remove/mark")
	public void removeMark(@RequestParam ("id") int id){
		// Implement remove by id here
		System.out.println(id);
	}

	@RequestMapping(value = "/api/remove/model")
	public void removeModel(@RequestParam ("id") int id){
		// Implement remove by id here
		System.out.println(id);
	}
	
	@RequestMapping(value = "/api/remove/vehicle")
	public void removeVehicle(@RequestParam ("id") int id){
		// Implement remove by id here
		System.out.println(id);
	}
	
}

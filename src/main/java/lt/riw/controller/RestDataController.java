package lt.riw.controller;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lt.riw.customers.Customer;
import lt.riw.customers.CustomerRepository;
import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleRepository;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class RestDataController {

	@Autowired
	private VehicleRepository vehRepo;

	@Autowired
	private CustomerRepository custRepo;

	@RequestMapping( value = "/insertvehicle", method = RequestMethod.POST)
	public String insertVehicle(
			@RequestBody Vehicle vehicle) {
		/*
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String test = gson.toJson(vehicle);
		System.out.println(test);
		*/
		vehRepo.save(vehicle);
		return "Done";
	}
	
	
	@RequestMapping( value = "/insertcustomer", method = RequestMethod.POST)
	public String insertCustomer(
			@RequestParam("age") int custAge, 
			@RequestParam("city") String custCity,
			@RequestParam("firstname") String firstName,
			@RequestParam("lastname") String lastName) {
		custRepo.save(new Customer(firstName, lastName, custAge, custCity));
		return "Done";
	}
	
	@RequestMapping("/showall")
	public String showAllVehicles() throws JsonGenerationException, JsonProcessingException, IOException {
		List<Vehicle> vehicles = (List<Vehicle>) vehRepo.findAll();
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String vehicleJson = gson.toJson(vehicles);
		return vehicleJson;
	}
	
	@RequestMapping(value = "/showone",  method = RequestMethod.GET)
	@ResponseBody
	public String showOne(@RequestParam(value = "id", required = true) int id){
		String oneVehicle = "";
		Vehicle vehicles = vehRepo.findById(id);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		oneVehicle = gson.toJson(vehicles);
		return oneVehicle;
	} 
	
	@RequestMapping(value ="/test")
	public void testResult(){
		Vehicle vhs = vehRepo.findById(1);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String result = gson.toJson(vhs);
		System.out.println(result);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public void updateOne(@RequestParam("model") String modelName){
		Vehicle vehicleToUpdate = vehRepo.findById(1);
		vehicleToUpdate.setModelName(modelName);
		vehRepo.save(vehicleToUpdate);
	}
	
}
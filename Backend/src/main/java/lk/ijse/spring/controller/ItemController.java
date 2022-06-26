package lk.ijse.spring.controller;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author Helitha Sri
 * @created 6/25/2022 - 2:10 AM
 * @project Spring POS
 */

@RestController
@RequestMapping("api/item")
@CrossOrigin
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllItems(){
        return new ResponseUtil(200,"OK",itemService.getAllItems());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addItem(@ModelAttribute ItemDTO itemDTO){
        itemService.saveItem(itemDTO);
        return new ResponseUtil(200,"Item added Successfully",null);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateItem(@RequestBody ItemDTO itemDTO){
        itemService.updateItem(itemDTO);
        return new ResponseUtil(200,"Item Update Successfully",null);
    }

    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteItem(@RequestParam String code){
        itemService.deleteItem(code);
        return new ResponseUtil(200,"Delete Item Successfully",null);
    }

    @GetMapping(path = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchItem(@RequestParam String search){
        return new ResponseUtil(200,"OK",itemService.searchItem(search,search));
    }

    @GetMapping(path = "/generate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateId(){
        return new ResponseUtil(200,"OK",itemService.generateItemId());
    }

}

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
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


    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addItem(ItemDTO itemDTO){
        itemService.saveItem(itemDTO);
        return new ResponseUtil(200,"Item added Successfully",null);
    }

}

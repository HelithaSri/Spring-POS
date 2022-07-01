package lk.ijse.spring.controller;


import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.OrderDetailsService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * @author Helitha Sri
 * @created 7/1/2022 - 12:16 AM
 * @project Spring POS
 */

@RestController
@RequestMapping("api/orderDetails")
@CrossOrigin
public class OrderDetailsController {

    @Autowired
    OrderDetailsService service;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrderDetails(@RequestParam String oid) {
        return new ResponseUtil(200, "Ok", service.getAllOrderDetails(oid));
    }

}

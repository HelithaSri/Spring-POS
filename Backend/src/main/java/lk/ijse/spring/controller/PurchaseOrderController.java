package lk.ijse.spring.controller;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author Helitha Sri
 * @created 6/30/2022 - 12:17 AM
 * @project Spring POS
 */

@RestController
@RequestMapping("api/purchaseOrder")
@CrossOrigin
public class PurchaseOrderController {

    @Autowired
    PurchaseOrderService orderService;

    @Autowired
    ItemService itemService;

    @Autowired
    CustomerService customerService;

    @GetMapping(path = "/loadItemCode", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllItemIds() {
        return new ResponseUtil(200, "Ok", itemService.getAllItemIds());
    }

    @GetMapping(path = "/loadItemDetails", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil loadSelectedItemDetails(@RequestParam String code) {
        ItemDTO itemDTO = itemService.loadSelectedItemDetails(code);
        System.out.println(itemDTO.toString());
        return new ResponseUtil(200, "Ok", itemService.loadSelectedItemDetails(code));
    }

    @GetMapping(path = "/loadCustomerCode", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCustomerIds() {
        return new ResponseUtil(200, "Ok", customerService.getAllCustomerIds());
    }

    @GetMapping(path = "/loadCustomerDetails", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil loadSelectedCustomerDetails(@RequestParam String id) {
        return new ResponseUtil(200, "Ok", customerService.loadSelectedCustomerDetails(id));
    }
}

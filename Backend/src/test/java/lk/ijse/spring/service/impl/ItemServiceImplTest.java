package lk.ijse.spring.service.impl;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.service.PurchaseOrderService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Helitha Sri
 * @created 6/30/2022 - 11:36 AM
 * @project Spring POS
 */

@WebAppConfiguration
@ContextConfiguration(classes = {WebAppConfig.class})
@ExtendWith(SpringExtension.class)
class ItemServiceImplTest {

    @Autowired
    PurchaseOrderService service;

    @Autowired
    ItemService itemService;

    @Test
    void getAllItemIds() {
        List<String> allItemIds = itemService.getAllItemIds();
        System.out.println("a : "+allItemIds);
    }
}
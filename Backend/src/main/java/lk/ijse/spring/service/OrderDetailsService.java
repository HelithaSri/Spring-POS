package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrdersDTO;

/**
 * @author Helitha Sri
 * @created 7/1/2022 - 12:20 AM
 * @project Spring POS
 */

public interface OrderDetailsService {

    OrdersDTO getAllOrderDetails(String oid);

}


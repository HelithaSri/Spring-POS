package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrdersDTO;

import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/30/2022 - 12:21 AM
 * @project Spring POS
 */

public interface PurchaseOrderService {

    void purchaseOrder(OrdersDTO dto);

    void deleteOrder(String oid);

    void updateOrder(OrdersDTO dto);

    OrdersDTO searchOrder(String oid);

//    List<OrdersDTO> getAllOrders();

}

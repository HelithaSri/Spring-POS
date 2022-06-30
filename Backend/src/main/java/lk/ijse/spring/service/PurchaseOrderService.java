package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrdersDTO;

/**
 * @author Helitha Sri
 * @created 6/30/2022 - 12:21 AM
 * @project Spring POS
 */

public interface PurchaseOrderService {

    void purchaseOrder(OrdersDTO dto);

    String generateOrderId();
}

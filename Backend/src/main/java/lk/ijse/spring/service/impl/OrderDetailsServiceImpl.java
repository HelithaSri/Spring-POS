package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.OrderDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Helitha Sri
 * @created 7/1/2022 - 12:21 AM
 * @project Spring POS
 */

@Service
@Transactional
public class OrderDetailsServiceImpl implements OrderDetailsService {

    @Autowired
    OrdersRepo ordersRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public OrdersDTO getAllOrderDetails(String oid) {
        return mapper.map(ordersRepo.getAllOrders(oid), OrdersDTO.class);
    }
}

package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/29/2022 - 5:57 PM
 * @project Spring POS
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class OrdersDTO {
    private String oid;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private double discount;
    private double total;
    private double subTotal;
    private CustomerDTO customerId;
    private List<OrderDetailsDTO> orderDetails;
}

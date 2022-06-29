package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author Helitha Sri
 * @created 6/29/2022 - 6:03 PM
 * @project Spring POS
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class OrderDetailsDTO {
    private String oid;
    private String itemCode;
    private int qty;
    private double unitPrice;
    private double total;
}

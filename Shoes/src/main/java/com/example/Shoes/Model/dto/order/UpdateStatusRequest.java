package com.example.Shoes.Model.dto.order;

import com.example.Shoes.Model.OrderStatus;

public class UpdateStatusRequest {
    private OrderStatus status;
        private String note;

        public OrderStatus getStatus() {
            return status;
        }

        public void setStatus(OrderStatus status) {
            this.status = status;
        }

        public String getNote() {
            return note;
        }

        public void setNote(String note) {
            this.note = note;
        }
}

package com.example.Shoes.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.User;
@Repository
public interface OrderRepository extends JpaRepository<Order,Long>, JpaSpecificationExecutor<Order>{
    List<Order> findByUser(User user);
    
    List<Order> findByStatus(OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.createdDate DESC")
    List<Order> findUserOrdersWithSort(@Param("userId") Long userId);
    
    boolean existsByOrderCode(String orderCode);
    List<Order> findByUserId(Long userId);

    //dashboard queries
    @Query("SELECT SUM(o.totalPrice) FROM Order o " +
       "WHERE o.createdDate BETWEEN :startDate AND :endDate " +
       "AND o.status = :status")
    Double findRevenueByDateRangeAndStatus(@Param("startDate") LocalDateTime startDate,
                                        @Param("endDate") LocalDateTime endDate,
                                        @Param("status") OrderStatus status);


    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdDate BETWEEN :startDate AND :endDate")
    Long countOrdersByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

   @Query("SELECT o.status, COUNT(o) FROM Order o WHERE o.createdDate BETWEEN :startDate AND :endDate GROUP BY o.status")
    List<Object[]> countOrdersByStatus(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

}

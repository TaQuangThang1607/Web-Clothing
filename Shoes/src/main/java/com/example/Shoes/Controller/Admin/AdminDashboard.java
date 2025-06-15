package com.example.Shoes.Controller.Admin;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shoes.Model.dto.DashboardSummaryDTO;
import com.example.Shoes.Service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminDashboard {
    private final AdminService adminService;

    @GetMapping("/dashboard/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        DashboardSummaryDTO summary = adminService.getDashboardSummary(startDate, endDate);
        return ResponseEntity.ok(summary);
    }
}

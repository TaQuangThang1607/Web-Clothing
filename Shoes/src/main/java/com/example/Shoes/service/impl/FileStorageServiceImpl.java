package com.example.Shoes.Service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Shoes.Service.FileStorageService;
import com.example.Shoes.utils.exception.FileStorageException;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    private static final Logger logger = LoggerFactory.getLogger(FileStorageServiceImpl.class);
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final String[] ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif",".webp"};

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileStorageException("File is empty or null");
        }

        // Kiểm tra kích thước file
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new FileStorageException("File size exceeds limit of 5MB");
        }

        // Kiểm tra định dạng file
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || !isValidExtension(originalFileName)) {
            throw new FileStorageException("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed");
        }

        try {
            // Vệ sinh tên file để tránh Directory Traversal
            String fileName = UUID.randomUUID() + "_" + originalFileName.replaceAll("[^a-zA-Z0-9.-]", "_");
            Path filePath = Paths.get(uploadDir, fileName).normalize();

            // Tạo thư mục nếu chưa tồn tại
            Files.createDirectories(filePath.getParent());

            // Lưu file
            Files.write(filePath, file.getBytes());
            logger.info("Stored file: {}", fileName);

            return "/uploads/" + fileName;
        } catch (IOException e) {
            logger.error("Failed to store file: {}", originalFileName, e);
            throw new FileStorageException("Failed to store file: " + originalFileName, e);
        }
    }

    @Override
    public void deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }

        try {
            String fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
            Path filePath = Paths.get(uploadDir, fileName).normalize();
            Files.deleteIfExists(filePath);
            logger.info("Deleted file: {}", fileName);
        } catch (IOException e) {
            logger.error("Failed to delete file: {}", fileUrl, e);
            throw new FileStorageException("Failed to delete file: " + fileUrl, e);
        }
    }

    @Override
    public String getFileStorageLocation() {
        return uploadDir;
    }

    private boolean isValidExtension(String fileName) {
        return Arrays.stream(ALLOWED_EXTENSIONS)
                .anyMatch(ext -> fileName.toLowerCase().endsWith(ext));
    }
}
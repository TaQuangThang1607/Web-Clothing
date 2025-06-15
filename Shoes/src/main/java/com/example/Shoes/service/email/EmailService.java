package com.example.Shoes.Service.email;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    // sử dụng javaMailSender
    public void sendResetPasswordEmail(String to, String resetToken) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String resetUrl = "http://localhost:3000/reset-password?token=" + resetToken;

        helper.setTo(to);
        helper.setSubject("Đặt lại mật khẩu");
        helper.setText(
            "<h3>Đặt lại mật khẩu</h3>" +
            "<p>Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu của bạn:</p>" +
            "<a href=\"" + resetUrl + "\">Đặt lại mật khẩu</a>" +
            "<p>Liên kết này sẽ hết hạn sau 15 phút.</p>" +
            "<p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>",
            true
        );

        mailSender.send(message);
    }
}
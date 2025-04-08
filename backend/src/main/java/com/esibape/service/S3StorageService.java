package com.esibape.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import com.esibape.entities.StorageService;

import net.coobird.thumbnailator.Thumbnails;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;


@Service
public class S3StorageService implements StorageService {

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.region}")
    private String awsRegion;
    
    @Value("${aws.access-key}")
    private String accessKey;

    @Value("${aws.secret-key}")
    private String secretKey;

    private S3Client s3Client;

    @PostConstruct
    public void init() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKey, secretKey);
        Region region = Region.of(awsRegion);

        this.s3Client = S3Client.builder()
                .region(region)
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            if (file.isEmpty() || file.getOriginalFilename() == null) {
                throw new IllegalArgumentException("Invalid file: empty or no filename.");
            }

            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf('.') + 1)
                    : "";

            String filename = UUID.randomUUID() + (extension.isEmpty() ? "" : "." + extension);

            // REDUZIR A IMAGEM AQUI
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            BufferedImage image = ImageIO.read(file.getInputStream());

            Thumbnails.of(image)
                    .size(800, 800) 
                    .outputFormat("jpeg")
                    .outputQuality(0.8) 
                    .toOutputStream(outputStream);

            byte[] imageBytes = outputStream.toByteArray();

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filename)
                    .contentType("image/jpeg")
                    .build();

            s3Client.putObject(request, RequestBody.fromBytes(imageBytes));

            return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, awsRegion, filename);

        } catch (IOException e) {
            throw new IllegalStateException("Failed to upload to S3", e);
        }
    }

    @Override
    public void deleteFile(String fileUrl) {
        String filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

        DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        s3Client.deleteObject(deleteRequest);
    }
}
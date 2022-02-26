import aws from "aws-sdk";

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();

  const post = await s3.createPresignedPost({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Fields: {
      key: req.query.file,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 10000000], // up to 1 MB
    ],
    ACL: "public-read",
  });

  res.status(200).json(post);
}

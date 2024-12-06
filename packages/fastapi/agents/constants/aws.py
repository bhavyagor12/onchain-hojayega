import boto3
from botocore.config import Config
import os

aws_region = os.getenv('AWS_REGION', 'ap-south-1')

# Create S3 client with custom config
s3_client = boto3.client('s3', 
                         region_name=aws_region,
                         config=Config(
                            region_name=aws_region,
                            signature_version='v4',
                            retries={
                                'max_attempts': 10,
                                'mode': 'standard'
                            }
                )
            )
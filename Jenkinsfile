pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-node-app"
        CONTAINER_NAME = "my-node-container"
        PORT = "3000"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Stop Old Container') {
            steps {
                echo "Stopping old container if exists..."
                sh "docker rm -f $CONTAINER_NAME || true"
            }
        }

        stage('Run Container') {
            steps {
                echo "Running new container..."
                sh "docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}

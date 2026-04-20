pipeline {
    agent any

    environment {
        DOCKER_USER = "your-docker-username"
        IMAGE_NAME = "my-node-app"
        VERSION = "${BUILD_NUMBER}"
        CONTAINER_NAME = "my-node-container"
        PORT = "3000"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t $DOCKER_USER/$IMAGE_NAME:$VERSION ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing image to Docker Hub..."
                sh "docker push $DOCKER_USER/$IMAGE_NAME:$VERSION"
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying container..."
                sh "docker rm -f $CONTAINER_NAME || true"
                sh "docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $DOCKER_USER/$IMAGE_NAME:$VERSION"
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

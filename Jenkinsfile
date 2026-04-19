pipeline {
    agent any

    environment {
        DOCKER_USER = "taufeeqdev"
        IMAGE_NAME = "my-node-app"
        VERSION = "${BUILD_NUMBER}"
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
                sh "docker rm -f my-node-container || true"
                sh "docker run -d -p 3000:3000 --name my-node-container $DOCKER_USER/$IMAGE_NAME:$VERSION"
            }
        }
    }
}

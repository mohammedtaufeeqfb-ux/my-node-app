pipeline {
    agent any

    environment {
        APP_NAME = "my-node-app"
        CONTAINER_NAME = "my-node-container"
        PORT = "3000"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image with version ${BUILD_NUMBER}"
                sh "docker build -t ${APP_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Stop Old Container') {
            steps {
                echo "Stopping old container..."
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage('Run Container') {
            steps {
                echo "Running container with version ${BUILD_NUMBER}"
                sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${APP_NAME}:${BUILD_NUMBER}"
            }
        }

    }

    post {
        success {
            echo "✅ Deployed version ${BUILD_NUMBER}"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}

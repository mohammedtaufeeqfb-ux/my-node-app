pipeline {
    agent any

    environment {
        DOCKER_USER = "taufeeqdev"
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

        stage('Docker Login') {
            steps {
                echo "Logging into Docker Hub..."
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing image..."
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

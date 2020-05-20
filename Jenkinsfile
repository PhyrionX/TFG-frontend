pipeline {
    agent {
        docker { image 'node:7-alpine' }
    }   

    stages {
        stage('Build') {
            steps {
                 sh 'node --version'
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

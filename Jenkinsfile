pipeline {
     agent { docker { image 'node:12.0.0' } }


    stages {
        stage('Build') {
            steps {
                sh 'node -v'
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

pipeline {
    stages {
        stage('Build') {
            steps {
                 sh 'echo $GIT_BRANCH'
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

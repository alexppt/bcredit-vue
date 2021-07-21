<template>
  <div>
    <br><br>
    ID: <input type="text" v-model="queryForm.id" placeholder="Please input id"/>
    <br><br>
    <button v-on:click="queryScore">Query Score</button>
    <button v-on:click="queryFactors">Query Factors</button>
    <button v-on:click="calculateScore">Calculate Score</button>
    <br><br>

    <template v-if="scoreVisible == true">
      <el-table ref="scoreTable"
                :data="scoreList"
                border
                fit
                stripe
                highlight-current-row
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="score" label="Credit Score">
        </el-table-column>
        <el-table-column prop="timestamp" label="Create Time">
        </el-table-column>
      </el-table>
    </template>

    <template v-if="factorVisible == true">
      <el-table ref="factorTable"
                :data="factorList"
                border
                fit
                stripe
                highlight-current-row
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="type" label="Credit Factor Type">
        </el-table-column>
        <el-table-column prop="amount" label="Amount">
        </el-table-column>
        <el-table-column prop="isOverdue" label="Overdue">
        </el-table-column>
        <el-table-column prop="timestamp" label="Create Time">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>

    export default {
        name: 'Bcredit',
        data() {
            return {
                queryForm: {
                    id: ''
                },
                scoreList: [],
                factorList: [],
                scoreVisible: false,
                factorVisible: false
            }
        },
        mounted() {
            this.scoreList = []
        },
        methods: {
            queryScore() {
                if (!this.queryForm.id) {
                    this.$message({
                        showClose: true,
                        message: 'Please input id',
                        type: 'warning'
                    })
                    return
                }


                this.$axios
                    .get('/queryCreditScoreById', {
                        params: {
                            id: this.queryForm.id
                        }
                    })
                    .then(
                        response => (this.scoreList = response.data)
                    ).then(
                    response => (this.scoreVisible = true)
                ).then(
                    response => (this.factorVisible = false)
                )
            }
            ,
            queryFactors() {
                if (!this.queryForm.id) {
                    this.$message({
                        showClose: true,
                        message: 'Please input id',
                        type: 'warning'
                    })
                    return
                }

                this.$axios
                    .get('/queryCreditFactorsById', {
                        params: {
                            id: this.queryForm.id
                        }
                    })
                    .then(
                        response => (this.factorList = response.data)
                    ).then(
                    response => (this.scoreVisible = false)
                ).then(
                    response => (this.factorVisible = true)
                )
            }
            ,
            calculateScore() {
                if (!this.queryForm.id) {
                    this.$message({
                        showClose: true,
                        message: 'Please input id',
                        type: 'warning'
                    })
                    return
                }

                this.$axios
                    .get('/calculateCreditScoreById', {
                        params: {
                            id: this.queryForm.id
                        }
                    })
                    .then(
                        response => {
                            if (response.data == '') {
                                this.$message({
                                    showClose: true,
                                    message: 'The user does not exist.',
                                    type: 'warning'
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: 'success!',
                                    type: 'success'
                                })
                            }
                        }
                    ).then(
                    response => (this.scoreVisible = false)
                ).then(
                    response => (this.factorVisible = false)
                )
            }
        }
    }
</script>

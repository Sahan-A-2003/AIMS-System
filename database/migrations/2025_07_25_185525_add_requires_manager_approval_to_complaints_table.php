<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('complaints', function (Blueprint $table) {
            if (!Schema::hasColumn('complaints', 'requires_manager_approval')) {
                $table->boolean('requires_manager_approval')->default(false)->after('attachments');
            }
            if (!Schema::hasColumn('complaints', 'manager_approved')) {
                $table->boolean('manager_approved')->default(false)->after('requires_manager_approval');
            }
            if (!Schema::hasColumn('complaints', 'approved_by_manager_id')) {
                $table->unsignedBigInteger('approved_by_manager_id')->nullable()->after('manager_approved');
                $table->foreign('approved_by_manager_id')->references('id')->on('users')->onDelete('set null');
            }
            if (!Schema::hasColumn('complaints', 'manager_approved_at')) {
                $table->timestamp('manager_approved_at')->nullable()->after('approved_by_manager_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('complaints', function (Blueprint $table) {
            $table->dropForeign(['approved_by_manager_id']);
            $table->dropColumn(['requires_manager_approval', 'manager_approved', 'approved_by_manager_id', 'manager_approved_at']);
        });
    }
};

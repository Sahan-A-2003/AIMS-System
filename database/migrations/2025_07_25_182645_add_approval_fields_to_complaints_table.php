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
            $table->text('approval_reason')->nullable()->after('category');
            $table->string('approval_request_title')->nullable()->after('approval_reason');
            $table->string('approval_category')->nullable()->after('approval_request_title');
            $table->string('approval_priority')->nullable()->after('approval_category');
            $table->string('estimated_resolution')->nullable()->after('approval_priority');
            $table->text('additional_notes')->nullable()->after('estimated_resolution');
            $table->text('attachments')->nullable()->after('additional_notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('complaints', function (Blueprint $table) {
            $table->dropColumn(['approval_reason', 'approval_request_title', 'approval_category', 'approval_priority', 'estimated_resolution', 'additional_notes', 'attachments']);
        });
    }
};
